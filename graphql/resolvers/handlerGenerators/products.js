const Products = require('../../../models/products')

async function getProducts() {
  try {
    const products = await Products.find().populate(['category', 'createdBy', 'updatedBy'])
    if (!products) throw new Error('No products found')

    return products.map(product => ({
      ...product._doc,
      category: product.category.name,
      createdBy: product.createdBy.username,
      updatedBy: product.updatedBy.username
    }))
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
      category: product.category.id,
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
      ...product,
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
    const { productUpdate } = args; //retrieve values from arguments
    let existing = await Products.findOne({ _id: productUpdate._id })
    if (!existing) {
      throw new Error('Product not exists!')
    }

    Products.findByIdAndUpdate( 
      { _id: productUpdate._id  },
      { ...productUpdate },
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
    Products.findByIdAndRemove( 
      args._id,
      (error, product) => {
        if (error){
          throw error
        }
      }
    )

    return 'Delete Successful!'
  }
  catch(err) {
    throw err
  }
}

module.exports = {
  getProducts,
  getProductById,
  getProductByCode,
  createProduct,
  editProduct,
  deleteProduct
}
