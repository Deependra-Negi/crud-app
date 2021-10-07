const express = require("express")
const app = express()
const cors = require("cors")
const connect = require("./configs/db")
app.use(cors())
app.use(express.json())

const studentController = require("./controllers/student.controller")

app.use("/students", studentController)

app.listen(5000, async function () {
    await connect()
    console.log("listening on port 5000")
})