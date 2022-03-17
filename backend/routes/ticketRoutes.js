import express from 'express'
import { getTickets, createTicket } from '../controllers/ticketController.js'

const router = express.Router()

import protect from '../middleware/authMiddleware.js'

router.route('/').get(protect, getTickets).post(protect, createTicket)


export default router