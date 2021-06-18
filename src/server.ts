import express from 'express'
import cors from 'cors'
import './database/connection'

import routes from './routes'

const app = express()

app.use(cors())

app.use(express.json())
app.use(routes)

app.listen(8080, "127.0.0.1", ()=>{
    console.log("http://localhost:8080")
})