const axios = require('axios')
const HighlightProduct = require('../../../models/highlightProduct')
const keys = require('../../../keys')

async function getProductHighlight() {
  try {
    const feature = await HighlightProduct.find().populate(['products']).limit(1)

    return feature
  }
  catch(err) {
    throw err
  }
}

async function createProductHighlight() {
  try {
    //retrieve values from arguments

    const highlightProduct = new HighlightProduct({
      title: 'SMART DESIGN AND TECHNOLOGY HAS NEVER LOOKED BETTER',
      subtitle: 'Discover the future of comfort plus cleanliness',
      products: ['60b066e8ed18be00150e49c6', '6094e01c472fc40015f41ba9', '6090b5fed7731c00157f3f71']
    }, (err, ) => { if (err) throw err })

    highlightProduct.save()

    return 'Product added.'
  }
  catch(err) {
    throw err
  }
}

async function updateProductHighlight(args) {
  try {
    const {
      _id,
      title,
      subtitle,
      cat
    } = args.catHighlightInput; //retrieve values from arguments
    
    const updatedHighlight= {
      _id,
      title,
      subtitle,
      cat
    }

    const highlightProduct = await HighlightProduct.findByIdAndUpdate( 
      { _id: updatedHighlight._id  },
      { ...updatedHighlight },
      {new: true}
    )
    await axios.post(keys.buildHook)

    return 'Updated'
  }
  catch(err) {
    throw err
  }
}

module.exports = {
  getProductHighlight,
  createProductHighlight,
  updateProductHighlight
}