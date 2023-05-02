import express  from "express";
import dotenv  from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";

// Importing the User Routes
import {router as userRouter} from "./router/user.route.js"
import {router as taskRouter} from "./router/task.route.js"
// import userRouter, { obj as userObj, callName} from "./router/user.route.js"

// console.log(userObj)
// callName()
// Creating the express app
const app = express()

// Exposing environment variables
dotenv.config()

// Database connection
mongoose.connect(process.env.MONGODB_CONNECTION_URL).then(()=> console.log("Database connection established")).catch(e=> console.log(e.message))


// Port configuration
const port = Number(process.env.PORT) || 3000;


// Middlewares
app.use(morgan('tiny'))
app.use(express.json())

// Routes 
app.use('/api/v1/user', userRouter)
app.use('/api/v1/task', taskRouter)

app.use((err, req, res, next)=>{
  return res.status(err.status || 404).json({
    message: err.message,
    status: "Failed",
  })
})

// Setting up the express server
app.listen(port, ()=>{
  console.log(`Server runnning on port: ${port}`)
})