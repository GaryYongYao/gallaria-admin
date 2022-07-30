const axios = require('axios')
const { renameFiles, deleteFile } = require('../../../utils/fileUpload')
const Products = require('../../../models/products')
const keys = require('../../../keys')

async function getAllProducts() {
  try {
    const products = await Products.find().populate(['category', 'createdBy', 'updatedBy'])

    return products.map(product => ({
      ...product._doc,
      category: (product.category || {}).name,
      baseShipping: (product.category || {}).baseShipping,
      shipping: (product.category || {}).shipping,
      createdBy: (product.createdBy || {}).username,
      updatedBy: (product.updatedBy || {}).username
    }))
  }
  catch(err) {
    throw err
  }
}

async function getProducts() {
  try {
    const products = await Products.find({ isDraft: false }).populate(['category', 'createdBy', 'updatedBy'])

    return products.map(product => ({
      ...product._doc,
      category: (product.category || {}).name,
      baseShipping: (product.category || {}).baseShipping,
      shipping: (product.category || {}).shipping,
      createdBy: (product.createdBy || {}).username,
      updatedBy: (product.updatedBy || {}).username
    }))
  }
  catch(err) {
    throw err
  }
}

async function getRecommendedProducts(args) {
  try {
    const product = await Products.findOne({ code: args.code })
    if (!product) throw new Error('Product not found')
    let products = await Products
    .find({ category: product.category, code: { $ne: args.code }, isDraft: false })
    .sort({ createdDate: -1 })
    .limit(4)
    if (products.length < 1) {
      products = await Products
      .find({ isFeature: true, code: { $ne: args.code }, isDraft: false })
      .sort({ createdDate: -1 })
      .limit(4)
    }

    return products
  }
  catch(err) {
    throw err
  }
}

async function getFeatureProducts() {
  try {
    let products = await Products
    .find({ isFeature: true })
    .sort({ createdDate: -1 })
    .limit(11)

    return products
  }
  catch(err) {
    throw err
  }
}

async function checkProductCode(args) {
  const { _id, code } = args
  try {
    const product = await Products.findOne({ code })
    if (!product || product._id === _id) return false
    return true
  }
  catch(err) {
    throw err
  }
}

async function getProductById(args) {
  try {
    const product = await Products.findOne({ _id: args._id }).populate(['category', 'createdBy', 'updatedBy'])
    if (!product) throw new Error('Product not found')

    return {
      ...product._doc,
      category: (product.category || {}).id,
      baseShipping: (product.category || {}).baseShipping,
      shipping: (product.category || {}).shipping,
      createdBy: (product.createdBy || {}).username,
      updatedBy: (product.updatedBy || {}).username
    }
  }
  catch(err) {
    throw err
  }
}

async function getProductByCode(args) {
  try {
    const product = await Products.findOne({ code: args.code }).populate(['category'])
    if (!product) throw new Error('Product not found')

    return {
      ...product._doc,
      category: product.category.name,
      baseShipping: (product.category || {}).baseShipping,
      shipping: (product.category || {}).shipping,
    }
  }
  catch(err) {
    throw err
  }
}

async function createProduct(args) {
  try {
    const { code, isDraft } = args.productInput; //retrieve values from arguments
    const existing = await Products.findOne({ code })
    if (existing) {
      throw new Error('Product already exists!')
    }

    const product = new Products({
      ...args.productInput
    }, (err) => { if (err) throw err })
    product.save()
    // !isDraft && await axios.post(keys.buildHook)
    
    return product
  }
  catch(err) {
    throw err
  }
}

async function editProduct(args) {
  try {
    let productNew = args.productUpdate //retrieve values from arguments
    let existing = await Products.findOne({ _id: productNew._id })
    if (!existing) {
      throw new Error('Product not exists!')
    }
    if (productNew.deletedFiles.length > 0) await productNew.deletedFiles.map(file => deleteFile(file))
    if (existing.code !== productNew.code) {
      const file = await renameFiles(productNew.file, existing.code, productNew.code)
      const images = await renameFiles(productNew.images, existing.code, productNew.code)
      const primaryImage = productNew.primaryImage.replace(existing.code, productNew.code)
      const featureImage = productNew.featureImage.replace(existing.code, productNew.code)
      const features = await renameFiles(productNew.features, existing.code, productNew.code)
      
      productNew = {
        ...productNew,
        images,
        primaryImage: primaryImage ? primaryImage : '',
        featureImage: featureImage ? featureImage : '',
        file: file ? file : '',
        features
      }
    }

    const product = await Products.findByIdAndUpdate( 
      { _id: productNew._id  },
      { ...productNew },
      {new: true}
    ).populate(['category', 'createdBy', 'updatedBy'])
    // !productNew.isDraft && await axios.post(keys.buildHook)
    
    return {
      ...product._doc,
      category: (product.category || {}).id,
      createdBy: (product.createdBy || {}).username,
      updatedBy: (product.updatedBy || {}).username
    }
  }
  catch(err) {
    throw err
  }
}

async function deleteProduct(args) {
  try {
    const product = await Products.findOne({ _id: args._id })
    if (!product) throw new Error('Product not found!')
    if (product.images.length > 0) {
      await product.images.forEach(async (image) => {
        try {
          await deleteFile(image)
          return
        }
        catch(err) {
          throw err
        }
      })
    }
    if (product.features.length > 0) {
      await product.features.forEach(async (feature) => {
        try {
          await deleteFile(feature)
          return
        }
        catch(err) {
          throw err
        }
      })
    }
    if (product.file.length > 0) {
      await product.file.forEach(async (f) => {
        try {
          await deleteFile(f)
          return
        }
        catch(err) {
          throw err
        }
      })
    }
    await Products.findByIdAndRemove(args._id)
    // await axios.post(keys.buildHook)

    return 'Delete Successful!'
  }
  catch(err) {
    throw err
  }
}


async function updateWebsite() {
  try {
    await axios.post(keys.buildHook)
    
    return 'Build and Deployment Started for the Website'
  }
  catch(err) {
    throw err
  }
}

async function updateProductField() {
  try {
    Products.update({}, { isArchive: false, size: { w: 0, d: 0, h: 0 } }, { multi: true }, (err, raw) => {
      if (err) return console.log(err);
    })
    
    return 'done'
  }
  catch(err) {
    throw err
  }
}

module.exports = {
  getAllProducts,
  getProducts,
  getFeatureProducts,
  getRecommendedProducts,
  checkProductCode,
  getProductById,
  getProductByCode,
  createProduct,
  editProduct,
  deleteProduct,
  updateWebsite,
  updateProductField
}
