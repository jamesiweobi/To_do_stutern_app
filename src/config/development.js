import dotenv from "dotenv"
dotenv.config()


export const development = {
  mongodb_connection_url: process.env.DEV_MONGODB_CONNECTION_URL,
  bycrypt_salt_round: +process.env.DEV_BCRYPT_SALT_ROUND,
  jwt_secret_key: process.env.DEV_JWT_SECRET,
  port: +process.env.PORT
}