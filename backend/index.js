const express = require("express");
const cors=require("cors");
require("dotenv").config();
const mainRouter = require("./routes/index");
const bodyParser = require("body-parser");
const app = express()
app.use(cors(
    {
        // origin:["https://paytm-virtual.vercel.app","http://localhost:5173"],
        origin: "*",
        methods:["POST, GET, PUT"],
        // credentials:true
    }
))

app.use(bodyParser.json())
app.use("/api/v1", mainRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("server is running at 3000")
})

module.exports = app;
