import {Router} from "express"
import TaskController from "../controller/task.controller.js"
import { tryCatchHandler} from "../utils/tryCatch.handler.js"

const router = Router()

router.post("/create",  tryCatchHandler( TaskController.createTask))

router.put("/update", tryCatchHandler( TaskController.updateOneTask))

router.get("/one", tryCatchHandler( TaskController.getOneTask))

router.get("/all_task", tryCatchHandler( TaskController.findAll))

router.delete("/delete", tryCatchHandler( TaskController.deleteOneTask))

export {router}