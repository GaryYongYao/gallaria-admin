const LandingMedia = require('../../../models/landingMedia')
const Products = require('../../../models/products')
const Projects = require('../../../models/projects')

async function getMedia() {
  try {
    const featureMedias = [
      'featureCatVideo/feature-video-1.mp4',
      'featureCatImg/cat-one.png',
      'featureCatImg/cat-two.png',
      'featureCatVideo/feature-video-2.mp4'
    ]
    const landingMediaResponse = await LandingMedia.find().limit(2)
    const landingMedias = await landingMediaResponse.map(({ media }) => media)

    const products = await Products.find({ isDraft: false })
    const productMedias = []
    const productFeatureMedias = []
    await products.forEach(async ({ images, features }) => {
      await images.forEach(image => productMedias.push(image))
      await features.forEach(image => productFeatureMedias.push(image))
    })

    const projects = await Projects.find({ isDraft: false })
    const projectMedias = []
    const projectFeatureMedias = []
    await projects.forEach(async ({ cover, photos }) => {
      await projectMedias.push(cover)
      await photos.forEach(image => productFeatureMedias.push(image))
    })

    const media = await [
      ...featureMedias,
      ...landingMedias,
      ...productMedias,
      ...productFeatureMedias,
      ...projectMedias,
      ...projectFeatureMedias
    ]

    return media
  }
  catch(err) {
    throw err
  }
}

module.exports = {
  getMedia
}