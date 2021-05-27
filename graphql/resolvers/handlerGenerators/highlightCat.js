const axios = require('axios')
const HighlightCat = require('../../../models/highlightCat')
const keys = require('../../../keys')

async function getCatHighlight() {
  try {
    const feature = await HighlightCat.find().populate(['product']).limit(11)

    return feature
  }
  catch(err) {
    throw err
  }
}

async function createCatHighlight() {
  try {
    //retrieve values from arguments

    const highlightCat = new HighlightCat({
      title: 'INTELLIGENT BATHROOMS BY GALLARIA',
      subtitle: 'Hygiene and comfort evolved',
      cat: [{
        id: 'Wall Hung Pan',
        photo: 'featureCatImg/wall-pan.png'
      },{
        id: 'Floor Pan',
        photo: 'featureCatImg/floor-pan.png'
      }]
    }, (err, ) => { if (err) throw err })

    highlightCat.save()

    return 'Product added.'
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
    await axios.post(keys.buildHook)

    return 'Updated'
  }
  catch(err) {
    throw err
  }
}

module.exports = {
  getCatHighlight,
  createCatHighlight,
  updateCatHighlight
}