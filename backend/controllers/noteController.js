import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Ticket from '../models/ticketModel.js'
import Note from '../models/noteModel.js'


// @description Get notes for a ticket
// @route       GET /api/tickets/:id/notes
// @access      Private
export const getNotes = asyncHandler(async (req, res) => {

  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(req.params.ticketId)

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorize')
  }

  const notes = await Note.find({ticket: req.params.ticketId})

  res.status(200).json(notes)
})

// @description Create note for a ticket
// @route       POST /api/tickets/:id/notes
// @access      Private
export const createNote = asyncHandler(async (req, res) => {
  const {text} = req.body

  if (!text) {
    res.status(400)
    throw new Error('You need to add a note')
  }

  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(req.params.ticketId)

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorize')
  }

  const note = await Note.create({
    text: req.body.text,
    isStaff: false,
    user: req.user.id,
    ticket: req.params.ticketId
  })

  res.status(201).json(note)
})


