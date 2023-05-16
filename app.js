import express  from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import {globalErrorHandler} from "./src/utils/errorHandler.js"
import { config } from "./src/config/index.js";

// Importing the User Routes
import {router as userRouter} from "./src/router/user.route.js"
import {router as taskRouter} from "./src/router/task.route.js"
// import userRouter, { obj as userObj, callName} from "./router/user.route.js"

// console.log(userObj)
// callName()
// Creating the express app
const app = express()

// Exposing environment variables
// dotenv.config()

// Database connection
mongoose.connect(config.mongodb_connection_url).then(()=> console.log("Database connection established")).catch(e=> console.log("Mongo connection error: ", e.message))


// Port configuration
const port = config.port || 3000;

// Middlewares
app.use(morgan('tiny'))
app.use(express.json())

// Routes 
app.use('/api/v1/user', userRouter)
app.use('/api/v1/task', taskRouter)

app.use(globalErrorHandler)

// Setting up the express server
app.listen(port, ()=>{
  console.log(`Server runnning on port: ${port}`)
})