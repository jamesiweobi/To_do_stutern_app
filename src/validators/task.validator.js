import Joi from "joi"
import JoiMongoId from "joi-objectid"

Joi.objectId = JoiMongoId(Joi)

export const createTaskValidator = Joi.object({
  creator: Joi.objectId().required(),
  creatorId: Joi.objectId().required(),
  // status: Joi.string().valid('pending', 'in-progress', 'completed').required(),
  title: Joi.string().required(),
  startDate: Joi.string().required(),
  endDate: Joi.string().required(),
}).strict()
