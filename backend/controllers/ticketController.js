import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Ticket from '../models/ticketModel.js'


// @description Get user tickets
// @route       GET /api/tickets
// @access      Private
export const getTickets = asyncHandler(async (req, res) => {

  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const tickets = await Ticket.find({user: req.user.id})

  res.status(200).json(tickets)
})

// @description Get user ticket
// @route       GET /api/tickets/:id
// @access      Private
export const getTicket = asyncHandler(async (req, res) => {

  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  // const ticket = await Ticket.findById(req.params.id)
  const ticket = await Ticket.findOne({_id: req.params.id, user: req.user.id})

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  res.status(200).json(ticket)
})

// @description update user ticket
// @route       PUT /api/tickets/:id
// @access      Private
export const updateTicket = asyncHandler(async (req, res) => {

  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findOne({user: req.user.id, _id: req.params.id})

  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {new: true})

  res.status(200).json(updatedTicket)
})


// @description delete a user tickets
// @route       DELETE /api/tickets/:id
// @access      Private
export const deleteTicket = asyncHandler(async (req, res) => {

  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findOne({user: req.user.id, id: req.params.id})

  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  await ticket.remove()

  res.status(200).json({success: true})
})

// @description Create new ticket
// @route       POST /api/tickets
// @access      Private
export const createTicket = asyncHandler(async (req, res) => {
  const {product, description} = req.body

  if (!product || !description) {
    res.status(400)
    throw new Error('You need to add a product and have a description')
  }

  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }


  //creat the ticket
  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id
  })

  res.status(201).json(ticket)
})
