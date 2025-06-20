import mongoose from 'mongoose'
import { envConfig } from './env'
import { CustomError } from '../middlewares/errorHandler'

const { mongoUri, dbName } = envConfig

export const ConnectDB = async () => {
  try {
    if (!mongoUri) throw new CustomError('Mongo uri not found', 404, ['Mongo uri not found'])
    if (!dbName) throw new CustomError('DB name not found', 404, ['DB name not found'])
    await mongoose.connect(mongoUri, {
      dbName: dbName
    })

    console.log('Mongo database initialized and connected ✅')
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error)
    process.exit(1)
  }
}