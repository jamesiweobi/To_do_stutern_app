import dotenv from 'dotenv'
import User from "../model/user.model.js"
import { createUserValidator, loginUserValidator } from "../validators/user.validator.js"
import { mongoIdValidator } from "../validators/mongoId.validator.js"
import { BadUserRequestError, NotFoundError } from "../error/error.js"
import {generateToken} from "../utils/jwt.utils.js"
import bcrypt from "bcrypt"

dotenv.config()

export default class UserController {

  static async createUser(req, res) {
    // Joi validation
    const { error, value } = createUserValidator.validate(req.body)
    if (error) throw error
    const emailExists = await User.find({ email: req.body.email })
    if (emailExists.length > 0) throw new BadUserRequestError("An account with this email already exists.")
    const usernameExists = await User.find({ username: req.body.username })
    if (usernameExists.length > 0) throw new BadUserRequestError("An account with this username already exists.")
    const saltRounds = Number(process.env.BCRYPT_SALT_ROUND)
    const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    }

    const newUser = await User.create(user)
    res.status(200).json({
      message: "User created successfully",
      status: "Success",
      data: {
        user: newUser,
        access_token: generateToken(newUser)
      }
    })
  }

  static async findUser(req, res,) {
    const { id } = req.query
    const { error } = mongoIdValidator.validate(req.query)
    if (error) throw new BadUserRequestError("Please pass in a valid mongoId")
    // if(!id) throw new BadUserRequestError("Please pass in a valid userId in the request query")
    const user = await User.findById(id)
    if (!user) throw new NotFoundError('User not found')

    res.status(200).json({
      message: "User found successfully",
      status: "Success",
      data: {
        user
      }
    })
  }

  // $or
  // $gt
  // $lt
  // $gte
  // $lte
  // $and


  static async loginUser(req, res) {
    const { error } = loginUserValidator.validate(req.body)
    if (error) throw error
    if (!req.body?.username && !req.body?.email) throw new BadUserRequestError("Please provide a username and email before you can login.")
    const user = await User.findOne({
      $or: [
        {
          email: req.body?.email,
        },{
          username: req.body?.username,
        }
      ]
    })
    if(!user) throw new BadUserRequestError("username, email does not exist")
    const hash = bcrypt.compareSync(req.body.password, user.password)
    if(!hash) throw new BadUserRequestError("username, email or password is wrong!")
    res.status(200).json({
      message: "User found successfully",
      status: "Success",
      data: {
        user,
        access_token: generateToken(user)
      }
    })
  }
}
