const { renameFile, renameFiles, deleteFile } = require('../../../utils/fileUpload')
const Products = require('../../../models/products')

async function getProducts() {
  try {
    const products = await Products.find().populate(['category', 'createdBy', 'updatedBy'])
    if (!products) throw new Error('No products found')

    return products.map(product => ({
      ...product._doc,
      category: (product.category || {}).name,
      createdBy: product.createdBy.username,
      updatedBy: product.updatedBy.username
    }))
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
      createdBy: product.createdBy.username,
      updatedBy: product.updatedBy.username
    }
  }
  catch(err) {
    throw err
  }
}

async function getProductByCode(args) {
  try {
    const product = await Products.findOne({ code: args.code }).populate(['category'])
    if (!product) throw new Error('Category not found')

    return {
      ...product._doc,
      category: product.category.name,
    }
  }
  catch(err) {
    throw err
  }
}

async function createProduct(args) {
  try {
    const { code } = args.productInput; //retrieve values from arguments
    const existing = await Products.findOne({ code })
    if (existing) {
      throw new Error('Product already exists!')
    }

    const product = new Products({
      ...args.productInput
    }, (err) => { if (err) throw err })
    product.save()
    
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
    if (existing.code !== productNew.code) {
      const file = await renameFile(productNew.file, productNew.file.replace(existing.code, productNew.code))
      const images = await renameFiles(productNew.images, existing.code, productNew.code)
      const primaryImage = productNew.primaryImage.replace(existing.code, productNew.code)
      const features = await renameFiles(productNew.features, existing.code, productNew.code)
      
      productNew = {
        ...productNew,
        images,
        primaryImage: primaryImage ? primaryImage : '',
        file: file ? file : '',
        features
      }
    }

    Products.findByIdAndUpdate( 
      { _id: productNew._id  },
      { ...productNew },
      {new: true},
      (error, product) => {

        if (error){
          throw error
        } else {
          product.save()
        }
      }
    )
    
    return 'Update Successful!'
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
    if (product.file) await deleteFile(product.file)
    await Products.findByIdAndRemove(args._id)

    return 'Delete Successful!'
  }
  catch(err) {
    throw err
  }
}

module.exports = {
  getProducts,
  checkProductCode,
  getProductById,
  getProductByCode,
  createProduct,
  editProduct,
  deleteProduct
}
