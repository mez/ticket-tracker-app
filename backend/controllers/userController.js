import asyncHandler from 'express-async-handler'

// @description Register a new user
// @route       /api/users
// @access      Public
export const registerUser = asyncHandler(async (req, res) => {

  const {name, email, password} = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  console.log(req.body);

  res.send('Register Route')
})

// @description Login a new user
// @route       /api/users/login
// @access      Public
export const loginUser = asyncHandler(async (req, res) => {
  res.send('Login Route')
})