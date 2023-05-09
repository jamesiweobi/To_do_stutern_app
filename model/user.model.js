// import { Schema, model }  from "mongoose";
import mongoose from "mongoose";
const { Schema, model} = mongoose;

// import what from "where"

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    min: 3,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    immutable: true,
    validators: {
      match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Please add a valid email string to the email path."]
    }
  },
  password: {
    type: String,
    required: true,
  },
  firstName: String,
  lastName: String,
  fullName: String,
}, {
  timestamps: true
})

UserSchema.pre("save", function(next){
  this.fullName = this.firstName + " " +  this.lastName 
  next()
})

export default model('User', UserSchema)
