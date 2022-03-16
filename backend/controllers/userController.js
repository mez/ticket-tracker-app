import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'


const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: '3h',
  })
}

// @description Get current logged in user
// @route       /api/users/mez
// @access      Protected
export const getMe = asyncHandler(async (req, res) => {

  res.status(200).json({
    id: req.user._id,
    email: req.user.email,
    name: req.user.name
  })
})

// @description Register a new user
// @route       /api/users
// @access      Public
export const registerUser = asyncHandler(async (req, res) => {

  const {name, email, password} = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  // first check if user exists
  const userExists = await User.findOne({email})

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // next we hash the password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // create user record
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }

})

// @description Login a new user
// @route       /api/users/login
// @access      Public
export const loginUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body

  if ( !email || !password) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  const user = await User.findOne({email})

  //check if user exists and confirm password matches
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error('Invalid credentials')
  }

  res.send('Login Route')
})