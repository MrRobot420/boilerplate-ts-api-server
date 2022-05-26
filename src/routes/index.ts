import express from 'express'
const routes = express.Router()

import questionRouter from './questions'

routes.use(questionRouter)

export default routes
