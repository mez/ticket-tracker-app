import express from 'express'
import protect from '../middleware/authMiddleware.js'
import { createNote, getNotes } from '../controllers/noteController.js'


const router = express.Router({mergeParams: true})

router.route('/')
  .get(protect, getNotes)
  .post(protect, createNote)


export default router