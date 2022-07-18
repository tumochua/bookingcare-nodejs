import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine"
import initWebRoutes from "./route/web"
import connectDB from "./config/connectDB"
import cors from 'cors'
// let app = express()

// let cors = require('cors')




require('dotenv').config()


let app = express()

app.use(cors({ credentials: true, origin: true }))
// app.use(cors())

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb' }))


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app)
initWebRoutes(app)

connectDB()

let port = process.env.PORT || 6969


app.listen(port, () => {
    console.log("backend nodejs in runing on the port" + port);
})