// const axios = require('axios')
const LandingMedia = require('../../../models/landingMedia')
// const keys = require('../../../keys')

async function getLandingMedia() {
  try {
    const landingMedia = await LandingMedia.find().limit(2)

    return landingMedia
  }
  catch(err) {
    throw err
  }
}

async function updateLandingMedia(args) {
  try {
    const {
      _id,
      media
    } = args.landingMediaInput; //retrieve values from arguments
    
    const updatedLandingMedia = {
      _id,
      media
    }

    const landingMedia = await LandingMedia.findByIdAndUpdate( 
      { _id: updatedLandingMedia._id  },
      { ...updatedLandingMedia },
      {new: true}
    )
    // await axios.post(keys.buildHook)

    return 'Updated Landing Media'
  }
  catch(err) {
    throw err
  }
}

module.exports = {
  getLandingMedia,
  updateLandingMedia
}