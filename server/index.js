require("dotenv").config;

const connectDb = require("./db/db")
const express = require("express")
const userRoutes = require("./routes/userRoutes")
const port = process.env.PORT | 5000

connectDb()

const app = express()
app.use(express.json())
app.get("/", (req, res)=>{
    res.send("working")
})

app.use("/api/user", userRoutes)



app.listen(port, () =>{
    console.log("listning on port :", port);
})