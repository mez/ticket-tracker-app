import express from "express";
import dotevn from 'dotenv'
import colors from 'colors'
import userRouter from './routes/userRoutes.js'
import {errorHandler} from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
dotevn.config() 

const PORT = process.env.PORT || 8000

// connect to DB
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.get('/', (req, res) => {
  res.status(201).json({message: 'Welcome to the Support Desk API'})
})
 

app.use('/api/users', userRouter)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
})
