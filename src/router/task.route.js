import {Router} from "express"
import TaskController from "../controller/task.controller.js"
import { tryCatchHandler} from "../utils/tryCatch.handler.js"

const router = Router()

router.post("/create",  tryCatchHandler( TaskController.createTask))

export {router}