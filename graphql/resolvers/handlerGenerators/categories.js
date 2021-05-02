const ProductCategories = require('../../../models/product-categories')

async function getCategories() {
  try {
    const categories = await ProductCategories.find().populate(['createdBy', 'updatedBy'])
    if (!categories) throw new Error('No categories found')

    return categories.map(category => ({
      _id: category._id,
      name: category.name,
      sub: category.sub,
      series: category.series,
      createdBy: category.createdBy.username,
      updatedBy: category.updatedBy.username
    }))
  }
  catch(err) {
    throw err
  }
}

async function getCategoriesOption() {
  try {
    const categories = await ProductCategories.find()
    if (!categories) throw new Error('No Categories found')

    return categories.map(category => ({
      _id: category._id,
      name: category.name
    }))
  }
  catch(err) {
    throw err
  }
}

async function getSubCategoriesOption(args) {
  try {
    const category = await ProductCategories.findOne({ _id: args._id })
    if (!category) throw new Error('Category not found')

    const returnData = await category.sub.map(option => ({
      sub: option,
      series: () => {
        const seriesData = category.series.filter(series => series.sub === option)
        return seriesData.map(data => data.name)
      }
    }))

    return returnData
  }
  catch(err) {
    throw err
  }
}

async function createCategory(args) {
  try {
    const {
      name,
      sub,
      series,
      createdBy,
      updatedBy
    } = args.categoryInput; //retrieve values from arguments
    const existing = await ProductCategories.findOne({ name })
    if (existing) {
      throw new Error('Category already exists!')
    }
    const category = new ProductCategories({
      name,
      sub,
      series,
      createdBy,
      updatedBy
    }, (err) => { if (err) throw err })
    category.save()
    
    return { ...category._doc }
  }
  catch(err) {
    throw err
  }
}

async function editCategory(args) {
  try {
    const {
      _id,
      name,
      sub,
      series,
      updatedBy
    } = args.categoryUpdate; //retrieve values from arguments
    let existing = await ProductCategories.findOne({ _id })
    if (!existing) {
      throw new Error('Category not exists!')
    }
    existing = await ProductCategories.findOne({ name })
    if (existing._id === _id) {
      throw new Error('Category already exists!')
    }
    const updatedCategory = {
      name: name === "" ? existing.name : name,
      sub,
      series,
      updatedBy
    }

    ProductCategories.findByIdAndUpdate( 
      { _id },
      updatedCategory,
      {new: true},
      (error, category) => {

        if (error){
          throw error
        } else {
          category.save()
        }
      }
    )
    
    return 'Update Successful!'
  }
  catch(err) {
    throw err
  }
}

async function deleteCategory(args) {
  try {
    ProductCategories.findByIdAndRemove( 
      args._id,
      (error, category) => {
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
  getCategories,
  getCategoriesOption,
  getSubCategoriesOption,
  createCategory,
  editCategory,
  deleteCategory
}
