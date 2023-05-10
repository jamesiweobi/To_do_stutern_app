import {Router} from "express"
import TaskController from "../controller/task.controller.js"
import { tryCatchHandler} from "../utils/tryCatch.handler.js"
import {userAuthMiddleWare} from "../middlewares/auth.middleware.js"

const router = Router()

router.post("/create", userAuthMiddleWare, tryCatchHandler( TaskController.createTask))

router.put("/update", userAuthMiddleWare, tryCatchHandler( TaskController.updateOneTask))

router.get("/one", userAuthMiddleWare, tryCatchHandler( TaskController.getOneTask))

router.get("/all_task", userAuthMiddleWare, tryCatchHandler( TaskController.findAll))

router.delete("/delete",  userAuthMiddleWare, tryCatchHandler( TaskController.deleteOneTask))

export {router}