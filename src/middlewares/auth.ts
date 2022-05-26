import { Request, Response, NextFunction } from 'express'
import config from 'config'
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const webhookSecret = config.get('API_SECRET')

const authMiddleware = (req: Request, res: Response, next: NextFunction): Response | void => {
    if (req.headers['x-api-key'] === webhookSecret) {
        return next()
    }

    return res.status(401).json({
        message: 'Not authorized!',
    })
}

export { authMiddleware }
