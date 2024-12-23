const express = require("express");
const cors=require("cors");
const mainRouter = require("./routes/index");
const bodyParser = require("body-parser");
const app = express()
app.use(cors(
    {
        origin:["https://paytm-virtual.vercel.app","http://localhost:5173"],
        methods:["POST, GET, PUT"],
        credentials:true
    }
))

app.use(bodyParser.json())
app.use("/api/v1", mainRouter)

app.listen(3000, () => {
    console.log("server is running at 3000")
})
