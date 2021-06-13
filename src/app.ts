import express from 'express'
import bodyParser from 'body-parser'
import config from 'config'
import routes from './routes'


const app = express()
app.use(bodyParser.json({ limit: '10MB'}))

app.use('/api', routes)


const PORT = config.get('API_PORT')

app.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`)
})