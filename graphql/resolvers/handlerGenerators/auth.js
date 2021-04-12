const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../../models/user')

async function createUser(args) {
  try {
    const {
      username,
      password,
      confirm,
      role
    } = args.userInput; //retrieve values from arguments
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      throw new Error('User already exists!')
    }
    if (password !== confirm) {
      throw new Error('Passwords are inconsistent!')
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({
      username,
      role,
      password: hashedPassword
    }, (err) => { if (err) throw err })
    user.save()
    // if user is registered without errors
    // create a token
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET)
    
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
      username,
      password,
      confirm,
      role
    } = args.userInput; //retrieve values from arguments
    const existingUser = await User.findOne({ username })
    if (!existingUser) {
      throw new Error('User already exists!')
    }
    if (password !== confirm) {
      throw new Error('Passwords are inconsistent!')
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const updatedUser = {
      username,
      password: hashedPassword,
      role
    }

    User.findByIdAndUpdate( 
      { _id },
      updatedUser,
      {new: true},
      (error, user) => {

        if (error){
          throw err
        } else {
          user.save()
        }
      }
    )

    return { info: 'Update Successful!' }
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
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET)
    return { token, password: null, ...user._doc }
  }
  catch (err) {
    throw err
  }
}

async function verifyToken(args) {
  try {
    const decoded = jwt.verify(args.token, process.env.TOKEN_SECRET)
    const user = await User.findOne({ _id: decoded.id })
    return { ...user._doc, password: null }
  }
  catch (err) {
    throw err
  }
}

module.exports = {
  createUser,
  editUser,
  login,
  verifyToken
}
