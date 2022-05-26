import cors from 'cors'
import helmet from 'helmet'
import config from 'config'
import morgan from 'morgan'
import express, { Request, Response } from 'express'
import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit'
import { Server } from 'http'
import routes from './routes'

class App {
    public app: express.Application
    private port: string
    private logFormat: string
    private rateLimiter: RateLimitRequestHandler = rateLimit({
        windowMs: 60 * 1000, // 1 minute
        max: 60,
        message: 'You have exceeded the 60 requests in 1 minute limit!',
        headers: true,
    })

    constructor() {
        this.app = express()
        this.port = process.env.PORT || config.get('PORT')
        this.logFormat = config.get('LOG_FORMAT')
    }

    public startServer(): Server {
        this.initializeMiddlewares()
        this.initializeControllers()
        this.initializeErrorHandlers()
        return this.app.listen(this.port, () => {
            console.group('Server details:')
            console.log('#############################################')
            console.log(`##  Server start time: ${Date.now()}`)
            console.log(`##  Service name: ${process.env.npm_package_name}`)
            console.log(`##  Server is listening on port: ${this.port}`)
            console.log(`##  Version: ${process.env.npm_package_version}`)
            console.log(`##  Press CTRL+C to stop the server`)
            console.log('#############################################')
        })
    }

    private initializeMiddlewares(): void {
        this.app.use(cors())
        this.app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }))
        this.app.use(morgan(this.logFormat))
        this.app.use(express.urlencoded({ limit: '20mb', extended: true }))
        this.app.use(express.json({ limit: '20mb' }))
    }

    private initializeControllers(): void {
        this.app.use('/api', this.rateLimiter, routes)
    }

    private initializeErrorHandlers(): void {
        this.app.use((req, res) => {
            return res.status(404).send({ message: 'Route ' + req.url + ' not found.' })
        })

        this.app.use((err: Error, _req: Request, res: Response) => {
            console.error('UNHANDLED EXCEPTION: ', err)
            return res.status(500).json({
                status: 'error',
                message: err.message,
            })
        })
    }
}

export default App
