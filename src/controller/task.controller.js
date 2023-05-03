import {createTaskValidator} from "../validators/task.validator.js"
import Task from "../model/task.model.js"
import User from "../model/user.model.js"
import { BadUserRequestError } from "../error/error.js"

export default class TaskController {
  static async createTask(req, res,){
      const {error } = createTaskValidator.validate(req.body)
      if(error) throw error

      const isUserAvailable = await User.findById(req.body.creator)
      if(!isUserAvailable) throw new BadUserRequestError(`User with this id: ${req.body.creator} does not exist`)

      const newTask = await Task.create(req.body)
      res.status(200).json({
      message: "Task created successfully",
      status: "Success",
      data:{
        task: newTask
      }
    })
  }
}