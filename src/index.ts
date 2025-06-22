import express, { json, urlencoded, Request, Response, NextFunction } from 'express'
import { envConfig } from './config/env'
import { sendResponse } from './utils/utils'
import cors from 'cors'
import morgan from 'morgan'
import { CustomError, errorHandler } from './middlewares/errorHandler'
import { ConnectDB } from './config/db'
import { machineRouter } from './routes/machine.route'

const app = express()

/**
 * Server configuration
 */
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use(urlencoded({ extended: true }))
app.use(json())

/**
 * Routes
 */
app.use('/healthy', (req: Request, res: Response) => {
  sendResponse(req, res, 'Server up!', 200)
})
app.use("/machines", machineRouter)

/**
 * Middlewares
 */
app.use(
  (err: CustomError, req: Request, res: Response, _next: NextFunction) => {
    errorHandler(err, req, res)
  }
)


/**
 * Database init
 */

ConnectDB().then(() => {
  app.listen(envConfig.port, () => {
    console.log(`🚀🚀 Server running on port: ${envConfig.port} 🚀🚀`);
  })
})