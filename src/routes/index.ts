import express from 'express'
const routes = express.Router()

import ideaRouter from './ideas'

routes.use(ideaRouter)

export default routes