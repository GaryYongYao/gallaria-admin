// const axios = require('axios')
const Feature = require('../../../models/feature')
// const keys = require('../../../keys')

async function getFeaturedAdmin() {
  try {
    const feature = await Feature.find().populate(['product']).limit(11)

    return feature
  }
  catch(err) {
    throw err
  }
}

async function getFeatured() {
  try {
    const features = await Feature.find().populate(['product']).limit(11)

    return features.map(({ product }) => ({
      code: (product || {}).code,
      name: (product || {}).name,
      featureImage: (product || {}).featureImage
    }))
  }
  catch(err) {
    throw err
  }
}

async function getCarousel() {
  try {
    const features = await Feature.find().populate(['product']).limit(5)

    return features.map(({ product }) => ({
      code: (product || {}).code,
      name: (product || {}).name,
      featureImage: (product || {}).featureImage
    }))
  }
  catch(err) {
    throw err
  }
}

async function addFeature(args) {
  try {
    const {
      _id
    } = args; //retrieve values from arguments

    const feature = new Feature({
      product: _id
    }, (err, ) => { if (err) throw err })

    feature.save()
    // await axios.post(keys.buildHook)

    return 'Product added.'
  }
  catch(err) {
    throw err
  }
}

async function deleteFeature(args) {
  try {
    Feature.findByIdAndRemove( 
      args._id,
      (error, feature) => {
        if (error){
          throw error
        }
      }
    )
    // await axios.post(keys.buildHook)

    return 'Product Removed'
  }
  catch(err) {
    throw err
  }
}

module.exports = {
  getFeaturedAdmin,
  getFeatured,
  getCarousel,
  addFeature,
  deleteFeature
}