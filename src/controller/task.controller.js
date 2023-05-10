import {createTaskValidator, updateTaskValidator} from "../validators/task.validator.js"
import Task from "../model/task.model.js"
import User from "../model/user.model.js"
import { BadUserRequestError, NotFoundError } from "../error/error.js"
import { mongoIdValidator } from "../validators/mongoId.validator.js"

export default class TaskController {
  static async createTask(req, res,){
      const {error } = createTaskValidator.validate(req.body)
      if(error) throw error
      const newTask = await Task.create({...req.body, creator: req.user._id, creatorId: req.user._id })
      res.status(201).json({
      message: "Task created successfully",
      status: "Success",
      data:{
        task: newTask
      }
    })
  }

  static async updateOneTask(req, res){
    const { id } = req.query
    const { error } = mongoIdValidator.validate(req.query)
    if( error ) throw new BadUserRequestError("Please pass in a valid mongoId")

    const updateValidatorResponse = await updateTaskValidator.validate(req.body)
    const updateTaskError = updateValidatorResponse.error
    if(updateTaskError) throw updateTaskError

    const task = await Task.findById(id)
    if(!task) throw new NotFoundError(`The task with this id: ${id}, does not exist`)

    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {new: true})
    return res.status(200).json({
      message: "Task updated successfully",
      status: "Success",
      data:{
        task: updatedTask
      }
    })
  }



  static async getOneTask(req, res) {
    const { id } = req.query
    const { error } = mongoIdValidator.validate(req.query)
    if( error ) throw new BadUserRequestError("Please pass in a valid mongoId")

    const task = await Task.findById(id)
    if(!task) throw new NotFoundError(`The task with this id: ${id}, does not exist`)

    return res.status(200).json({
      message: "Task found successfully",
      status: "Success",
      data: {
        task: task
      }
    })
  }


  static async deleteOneTask(req, res) {
    const { id } = req.query
    const { error } = mongoIdValidator.validate(req.query)
    if( error ) throw new BadUserRequestError("Please pass in a valid mongoId")

    const task = await Task.findById(id)
    if(!task) throw new NotFoundError(`The task with this id: ${id}, does not exist`)

    await Task.findByIdAndUpdate(id, {
      isDeleted: true
    })
    // await Task.findOneAndDelete()

    return res.status(200).json({
      message: "Task deleted successfully",
      status: "Success",
    })
  }


  static async findAll(req, res) {
const id = req.user._id
    const { error } = mongoIdValidator.validate(req.query)
    if( error ) throw new BadUserRequestError("Please pass in a valid mongoId")

    const user = await User.findById(id)
    if(!user) throw new NotFoundError(`The user with this id: ${id}, does not exist`)

    const tasks =  await Task.find({ creatorId: id }).populate("creator")

    return res.status(200).json({
      message: tasks.length < 1 ? "No tasks found" : "Tasks found successfully",
      status: "Success",
      data: {
        tasks: tasks
      }
    })
  }
}