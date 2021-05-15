const axios = require('axios')
const { deleteFile } = require('../../../utils/fileUpload')
const Projects = require('../../../models/projects')
const keys = require('../../../keys')

async function getAllProjects() {
  try {
    const projects = await Projects.find().populate(['products', 'createdBy', 'updatedBy'])

    return projects.map(project => ({
      ...project._doc,
      products: project.products.map(product => ({
        name: product.name,
        code: product.code,
        primaryImage: product.primaryImage
      })),
      createdBy: project.createdBy.username,
      updatedBy: project.updatedBy.username
    }))
  }
  catch(err) {
    throw err
  }
}

async function getProjects() {
  try {
    const projects = await Projects.find({ isDraft: false }).populate(['products', 'createdBy', 'updatedBy'])

    return projects.map(project => ({
      ...project._doc,
      products: project.products.map(product => ({
        name: product.name,
        code: product.code,
        primaryImage: product.primaryImage
      })),
      createdBy: project.createdBy.username,
      updatedBy: project.updatedBy.username
    }))
  }
  catch(err) {
    throw err
  }
}

async function getLatestProjects() {
  try {
    const projects = await Projects.find({ _id: { $ne: args._id }, isDraft: false }).populate(['products', 'createdBy', 'updatedBy'])

    return projects.map(project => ({
      ...project._doc,
      products: project.products.map(product => ({
        name: product.name,
        code: product.code,
        primaryImage: product.primaryImage
      })),
      createdBy: project.createdBy.username,
      updatedBy: project.updatedBy.username
    }))
  }
  catch(err) {
    throw err
  }
}

async function getProjectById(args) {
  try {
    const project = await Projects.findOne({ _id: args._id }).populate(['products', 'createdBy', 'updatedBy'])
    if (!project) throw new Error('Project not found')

    return {
      ...project._doc,
      products: project.products.map(product => ({
        name: product.name,
        code: product.code,
        primaryImage: product.primaryImage
      })),
      createdBy: project.createdBy.username,
      updatedBy: project.updatedBy.username
    }
  }
  catch(err) {
    throw err
  }
}

async function getAdminProjectById(args) {
  try {
    const project = await Projects.findOne({ _id: args._id }).populate(['createdBy', 'updatedBy'])
    if (!project) throw new Error('Project not found')

    return {
      ...project._doc,
      createdBy: project.createdBy.username,
      updatedBy: project.updatedBy.username
    }
  }
  catch(err) {
    throw err
  }
}

async function createProject(args) {
  try {
    const projectInput = {
      name: '',
      location: '',
      type: '',
      date: '',
      desc: '',
      cover: '',
      photos: [],
      products: [],
      createdBy: args.id,
      updatedBy: args.id
    }
    const project = new Projects({
      ...projectInput
    }, (err) => { if (err) throw err })
    project.save()
    
    return project._id
  }
  catch(err) {
    throw err
  }
}

async function editProject(args) {
  try {
    let projectNew = args.projectInput //retrieve values from arguments
    let existing = await Projects.findOne({ _id: projectNew._id })
    if (!existing) {
      throw new Error('Product not exists!')
    }

    const project = await Projects.findByIdAndUpdate( 
      { _id: projectNew._id  },
      { ...projectNew },
      {new: true}
    ).populate(['createdBy', 'updatedBy'])
    await axios.post(keys.buildHook)
    
    return {
      ...project._doc,
      createdBy: project.createdBy.username,
      updatedBy: project.updatedBy.username
    }
  }
  catch(err) {
    throw err
  }
}

async function deleteProject(args) {
  try {
    const project = await Projects.findOne({ _id: args._id })
    if (!project) throw new Error('Project not found!')
    if (project.photos.length > 0) {
      await project.photos.forEach(async (image) => {
        try {
          await deleteFile(image)
          return
        }
        catch(err) {
          throw err
        }
      })
    }
    if (project.cover) await deleteFile(project.cover)
    await Projects.findByIdAndRemove(args._id)
    await axios.post(keys.buildHook)

    return 'Delete Successful!'
  }
  catch(err) {
    throw err
  }
}

module.exports = {
  getAllProjects,
  getProjects,
  getLatestProjects,
  getProjectById,
  getAdminProjectById,
  createProject,
  editProject,
  deleteProject
}
