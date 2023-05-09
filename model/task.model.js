// import { Schema, model, Types, Query} from "mongoose"
import mongoose from "mongoose";
const { Schema, model, Types, Query } = mongoose;

const TaskSchema = new Schema({
  creator: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  creatorId: String,
  status: {
    type:String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true
  },
  startDate: Date,
  endDate: Date
},{
  timestamps: true
})

TaskSchema.pre(/^find/, (next)=>{
  if (this instanceof Query) {
    this.where({ isDeleted: { $ne: true } }); 
  }
})

export default model('Task', TaskSchema)