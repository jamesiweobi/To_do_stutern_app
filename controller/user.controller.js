import User from "../model/user.model.js"
import { createUserValidator } from "../validators/user.validator.js"

export default class UserController {

  static async createUser(req, res, next ) {

    // Joi validation
    const {error, value} = await createUserValidator.validate(req.body)
    if(error){
      console.log(error.details)
      const err = new Error(error.details[0].message)
      err.status = 400
      err.message = error.details[0].message
      return next(err)
    }
    try{
      const newUser = await User.create(req.body)
      res.status(200).json({
        message: "User created successfully",
        status: "Success",
        data:{
          user: newUser
        }
      })
    }catch(err){
      console.log(err.message)
      next(err)
    }
  }
}
