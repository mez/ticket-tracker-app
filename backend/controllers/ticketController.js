import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Ticket from '../models/ticketModel.js'


// @description Get user tickets
// @route       GET /api/tickets
// @access      Private
export const getTickets = asyncHandler(async (req, res) => {

  res.status(200).json({
    message: 'get tickets'
  })
})

// @description Create new ticket
// @route       POST /api/tickets
// @access      Private
export const createTicket = asyncHandler(async (req, res) => {

  res.status(200).json({
    message: 'create ticket'
  })
})
