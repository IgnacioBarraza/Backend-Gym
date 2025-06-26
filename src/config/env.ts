import { config } from "dotenv";
config()
const {
  MONGO_URI,
  PORT,
  DB_NAME,
  JWT_SECRET
} = process.env

export const envConfig = {
  port: PORT,
  mongoUri: MONGO_URI,
  dbName: DB_NAME,
  jwtSecret: JWT_SECRET
}