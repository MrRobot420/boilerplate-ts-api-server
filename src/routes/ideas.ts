import express from 'express'
const ideaRouter = express.Router()
import { IIdea } from '../types'

ideaRouter.get('/ideas', async (req, res): Promise<object> => {
    const { userId } = req.body
    const ideas: IIdea[] = [
        
    ]
    return res.status(200).send({ ideas })
})

export default ideaRouter