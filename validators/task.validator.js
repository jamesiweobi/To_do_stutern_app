import Joi from 'joi'

export const createTaskValidator = Joi.object({
  creator: Joi.string().required(),
  creatorId: Joi.string().required(),
  // status: Joi.string().valid('pending', 'in-progress', 'completed').required(),
  title: Joi.string().required(),
  startDate: Joi.string().required(),
  endDate: Joi.string().required(),
}).strict()
