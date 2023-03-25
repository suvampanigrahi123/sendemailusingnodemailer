import express from "express"
import { sendMail } from "./controllers/sendemail.js";
import dotenv from "dotenv"
import bodyParser from "body-parser";
import cors from "cors"
import cloudinary from "cloudinary"
import fileUpload from "express-fileupload";
//config
dotenv.config({path:"./config.env"})

const app = express();

app.use(express.static("public"))
app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use(cors({origin:"*"}))
app.use(fileUpload())
cloudinary.config({
  cloud_name:process.env.CLOUDINARY_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET
})

app.get("/", (_req, res) => {
    res.send("I am Avtar Maker Server")
})

app.post("/sendemail",sendMail)

app.listen(process.env.PORT, () => {
    console.log(`Server is Running in http://localhost:${process.env.PORT}`);
})