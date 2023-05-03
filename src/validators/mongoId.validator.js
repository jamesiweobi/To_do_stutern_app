import Joi from "joi"

import JoiMongoId from "joi-objectid"

Joi.objectId = JoiMongoId(Joi)


export const mongoIdValidator = Joi.object({
  id: Joi.objectId()
}).strict()






