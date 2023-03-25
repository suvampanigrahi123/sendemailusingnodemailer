import express from "express"
import { sendMail } from "./controllers/sendemail.js";
import dotenv from "dotenv"
import bodyParser from "body-parser";
import multer from "multer";
import path from "path"
import cors from "cors"
//config
dotenv.config({path:"./config.env"})
let paths = [];
let subject = ""

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/uploads");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
});
const app = express();

let upload = multer({ storage: storage })
app.use(express.static("public"))
app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use(cors({origin:"*"}))

app.get("/", (_req, res) => {
    res.send("I am Avtar Maker Server")
})

app.post("/sendemail",upload.single("file"),sendMail)

app.listen(process.env.PORT, () => {
    console.log(`Server is Running in http://localhost:${process.env.PORT}`);
})