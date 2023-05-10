import jwt, { verify } from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export function generateToken(user){
  const payload = {
    _id: user._id,
    email: user.email,
    username: user.username
  }
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
  return token 
}

export function verifyToken(token){
 return jwt,verify(token,  process.env.JWT_SECRET)
}