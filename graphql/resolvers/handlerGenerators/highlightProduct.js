// const axios = require('axios')
const HighlightProduct = require('../../../models/highlightProduct')
// const keys = require('../../../keys')

async function getProductHighlight() {
  try {
    const feature = await HighlightProduct.find().populate(['products']).limit(1)

    return feature
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
      products
    } = args.productHighlightInput; //retrieve values from arguments
    
    const updatedHighlight= {
      _id,
      title,
      subtitle,
      products
    }

    const highlightProduct = await HighlightProduct.findByIdAndUpdate( 
      { _id: updatedHighlight._id  },
      { ...updatedHighlight },
      {new: true}
    )
    // await axios.post(keys.buildHook)

    return 'Updated Product Highlight.'
  }
  catch(err) {
    throw err
  }
}

module.exports = {
  getProductHighlight,
  updateProductHighlight
}