import express, { Request, Response } from 'express'
import { getAnswer } from '../services'
const questionRouter = express.Router()

questionRouter.get('/answer-question', async (req: Request, res: Response): Promise<object> => {
    const { question } = req.body
    const answer = await getAnswer(question)
    return res.status(200).send({ answer })
})

export default questionRouter
