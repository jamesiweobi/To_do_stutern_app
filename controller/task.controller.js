import {createTaskValidator} from "../validators/task.validator.js"
import Task from "../model/task.model.js"

export default class TaskController {
  static async createTask(req, res, next){
    try{
      const {error, value} = await createTaskValidator.validate(req.body)
      if(error){
        console.log(error.details)
        const err = new Error(error.details[0].message)
        err.status = 400
        err.message = error.details[0].message
        return next(err)
      }
    const newTask = await Task.create(req.body)
    res.status(200).json({
      message: "Task created successfully",
      status: "Success",
      data:{
        task: newTask
      }
    })
    }catch(err){
      console.log(err.message)
      next(err)
    }
  }
}