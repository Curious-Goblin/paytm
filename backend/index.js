const express = require("express");
const cors=require("cors");
const mainRouter = require("./routes/index");
const bodyParser = require("body-parser");
const app = express()
app.use(cors(
    {
        
    }
))

app.use(bodyParser.json())
app.use("/api/v1", mainRouter)

app.listen(3000, () => {
    console.log("server is running at 3000")
})
