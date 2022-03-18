import express from 'express'
import { getTickets, createTicket, getTicket, deleteTicket, updateTicket } from '../controllers/ticketController.js'

const router = express.Router()

import protect from '../middleware/authMiddleware.js'

// re-route into note router for ticket specific notes
import noteRouter from './noteRoutes.js'
router.use('/:ticketId/notes', noteRouter)

router.route('/')
  .get(protect, getTickets)
  .post(protect, createTicket)

router.route('/:id')
  .get(protect, getTicket)
  .delete(protect, deleteTicket)
  .put(protect, updateTicket)


export default router