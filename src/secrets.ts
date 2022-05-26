import fs from 'fs'

const secretsFilePath = '.secrets.json'

const rawData = fs.readFileSync(secretsFilePath, 'utf8')
const secrets = JSON.parse(rawData)

export default secrets
