const axios = require('axios')
const Locations = require('../../../models/locations')
const keys = require('../../../keys')

async function getLocations() {
  try {
    const locations = await Locations.find()

    return locations.map(location => ({
      _id: location._id,
      name: location.name,
      address: location.address,
      phone: location.phone,
      website: location.website,
      position: location.position
    }))
  }
  catch(err) {
    throw err
  }
}

async function getLocationById(args) {
  try {
    const location = await Locations.findOne({ _id: args._id })
    if (!location) throw new Error('Product not found')

    return { ...location._doc }
  }
  catch(err) {
    throw err
  }
}

async function createLocation(args) {
  try {
    const {
      name,
      address,
      phone,
      website,
      position
    } = args.locationInput; //retrieve values from arguments
    const existing = await Locations.findOne({ name })
    if (existing) {
      throw new Error('Location already exists!')
    }
    const location = new Locations({
      name,
      address,
      phone,
      website,
      position
    }, (err) => { if (err) throw err })
    location.save()
    await axios.post(keys.buildHook)
    
    return { ...location._doc }
  }
  catch(err) {
    throw err
  }
}

async function editLocation(args) {
  try {
    const {
      _id,
      name,
      address,
      phone,
      website,
      position
    } = args.locationUpdate; //retrieve values from arguments
    let existing = await Locations.findOne({ _id })
    if (!existing) {
      throw new Error('Location not exists!')
    }
    
    const updatedLocation = {
      _id,
      name,
      address,
      phone,
      website,
      position
    }

    const location = await Locations.findByIdAndUpdate( 
      { _id: updatedLocation._id  },
      { ...updatedLocation },
      {new: true}
    )
    await axios.post(keys.buildHook)
    
    return {
      ...location._doc
    }
  }
  catch(err) {
    throw err
  }
}

async function deleteLocation(args) {
  try {
    Locations.findByIdAndRemove( 
      args._id,
      (error, location) => {
        if (error){
          throw error
        }
      }
    )
    await axios.post(keys.buildHook)

    return 'Delete Successful!'
  }
  catch(err) {
    throw err
  }
}

module.exports = {
  getLocations,
  getLocationById,
  createLocation,
  editLocation,
  deleteLocation
}
