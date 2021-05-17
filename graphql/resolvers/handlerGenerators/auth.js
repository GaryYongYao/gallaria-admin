const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../../keys')
const User = require('../../../models/user')

async function getUsers() {
  try {
    const users = await User.find().populate(['createdBy'])
    if (!users) throw new Error('No user found')

    return users.map(user => ({
      _id: user._id,
      username: user.username,
      role: user.role,
      createdBy: user.createdBy.username
    }))
  }
  catch(err) {
    throw err
  }
}

async function createUser(args) {
  try {
    const {
      username,
      role,
      createdBy
    } = args.userInput; //retrieve values from arguments
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      throw new Error('User already exists!')
    }
    const hashedPassword = await bcrypt.hash('Password12345', 10)
    const user = new User({
      username,
      role,
      password: hashedPassword,
      createdBy
    }, (err) => { if (err) throw err })
    user.save()
    // if user is registered without errors
    // create a token
    const token = jwt.sign({ id: user._id }, keys.tokenSecret)
    
    return { token, password: null, ...user._doc }
  }
  catch(err) {
    throw err
  }
}

async function editUser(args) {
  try {
    const {
      _id,
      username = "",
      role = ""
    } = args.userInput; //retrieve values from arguments
    const existingUser = await User.findOne({ _id })
    if (!existingUser) {
      throw new Error('User not exists!')
    }
    const updatedUser = {
      username: username === "" ? existingUser.username : username,
      role: role === "" ? existingUser.role : role
    }

    User.findByIdAndUpdate( 
      { _id },
      updatedUser,
      {new: true},
      (error, user) => {

        if (error){
          throw error
        } else {
          user.save()
        }
      }
    )
    
    return 'Update Successful!'
  }
  catch(err) {
    throw err
  }
}

async function changePassword(args) {
  try {
    const {
      _id,
      password,
      confirm
    } = args; //retrieve values from arguments
    const existingUser = await User.findOne({ _id })
    if (!existingUser) {
      throw new Error('User not exists!')
    }
    if (password !== confirm) {
      throw new Error('Passwords are inconsistent!')
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const updatedUser = {
      password: hashedPassword
    }

    User.findByIdAndUpdate( 
      { _id },
      updatedUser,
      {new: true},
      (error, user) => {

        if (error){
          throw error
        } else {
          user.save()
        }
      }
    )
    
    return 'Update Successful!'
  }
  catch(err) {
    throw err
  }
}

async function deleteUser(args) {
  try {
    User.findByIdAndRemove( 
      args._id,
      (error, user) => {
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

async function login(args) {
  try {
    const user = await User.findOne({ username: args.username })
    if (!user) throw new Error('Account does not exist')
    const passwordIsValid = await bcrypt.compareSync(args.password, user.password)
    if (!passwordIsValid) throw new Error('Password incorrect')
    const token = jwt.sign({ id: user._id }, keys.tokenSecret, { expiresIn: '14d'})
    return { token, password: null, ...user._doc }
  }
  catch (err) {
    throw err
  }
}

async function verifyToken(args) {
  try {
    const decoded = jwt.verify(args.token, keys.tokenSecret)
    const user = await User.findOne({ _id: decoded.id })
    const token = jwt.sign({ id: user._id }, keys.tokenSecret, { expiresIn: '14d'})
    return { ...user._doc, token, password: null }
  }
  catch (err) {
    throw err
  }
}

module.exports = {
  getUsers,
  createUser,
  changePassword,
  editUser,
  deleteUser,
  login,
  verifyToken
}
