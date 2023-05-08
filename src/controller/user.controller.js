import User from "../model/user.model.js"
import { createUserValidator } from "../validators/user.validator.js"
import { mongoIdValidator } from "../validators/mongoId.validator.js"
import { BadUserRequestError, NotFoundError } from "../error/error.js"
import { Types } from "mongoose"

export default class UserController {

    static async createUser(req, res ) {
      // Joi validation
      const {error, value} = createUserValidator.validate(req.body)
      if(error) throw error
      //TODO: Confirm username and email has not been used but another user, do this by using the $or mongoose operator
      const newUser = await User.create(req.body)
      res.status(200).json({
      message: "User created successfully",
      status: "Success",
      data:{
        user: newUser
        }
      })
    }


 


  static async findUser(req, res,) {
    const { id } = req.query
    const {error} = mongoIdValidator.validate(req.query)
    if(error) throw new BadUserRequestError("Please pass in a valid mongoId")
    // if(!id) throw new BadUserRequestError("Please pass in a valid userId in the request query")
    const user = await User.findById(id)
    if (!user) throw new NotFoundError('User not found')

    res.status(200).json({
    message: "User found successfully",
    status: "Success",
    data:{
      user
      }
    })
  }

}
