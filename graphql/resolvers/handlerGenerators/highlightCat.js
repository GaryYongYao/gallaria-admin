// const axios = require('axios')
const HighlightCat = require('../../../models/highlightCat')
// const keys = require('../../../keys')

async function getCatHighlight() {
  try {
    const feature = await HighlightCat.find().limit(1)

    return feature
  }
  catch(err) {
    throw err
  }
}

async function updateCatHighlight(args) {
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

    const highlightCat = await HighlightCat.findByIdAndUpdate( 
      { _id: updatedHighlight._id  },
      { ...updatedHighlight },
      {new: true}
    )
    // await axios.post(keys.buildHook)

    return 'Updated'
  }
  catch(err) {
    throw err
  }
}

module.exports = {
  getCatHighlight,
  updateCatHighlight
}