const express=require("express");
const cors = require("cors");
const UserRoutes = require("./Routes/user");
const dotenv = require("dotenv");
dotenv.config();

const Port = 8000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", UserRoutes);

// app.get("/", (req,res) =>{
//     return res.json({status: true});
// })

app.listen(Port, function(){
    console.log(`app is running on port ${Port}`)
})
