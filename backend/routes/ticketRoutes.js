import express from 'express'
import { getTickets, createTicket, getTicket, deleteTicket, updateTicket } from '../controllers/ticketController.js'

const router = express.Router()

import protect from '../middleware/authMiddleware.js'

router.route('/')
  .get(protect, getTickets)
  .post(protect, createTicket)

router.route('/:id')
  .get(protect, getTicket)
  .delete(protect, deleteTicket)
  .put(protect, updateTicket)


export default router