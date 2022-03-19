import path from "path";
import express from "express";
import dotevn from 'dotenv'
import colors from 'colors'
import userRouter from './routes/userRoutes.js'
import ticketRouter from './routes/ticketRoutes.js'
import {errorHandler} from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
dotevn.config() 

import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);


const PORT = process.env.PORT || 8000

// connect to DB
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use('/api/users', userRouter)
app.use('/api/tickets', ticketRouter)


//serve frontend if in prod
if (process.env.NODE_ENV === 'production') {
  // set build folder as static
  const current_dir = path.dirname(__filename);

  app.use( express.static( path.join(current_dir, '../frontend/build') ) )
  app.get('*', (req, res) => {
    res.sendFile( path.join(current_dir, '../', 'frontend', 'build', 'index.html' ))
  })
} else {
  app.get('/', (req, res) => {
    res.status(201).json({message: 'Welcome to the Support Desk API'})
  })
}


app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
})
