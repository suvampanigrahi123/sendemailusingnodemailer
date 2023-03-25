import nodemailer from "nodemailer"
import { unlink } from 'node:fs/promises';
export const sendMail = async (req, res) => {
  try { 
    const {email,name,requirement} = req.body;
    const config = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMPT_MAIL,
        pass:process.env.SMPT_PASSWORD,
      }
    })
  
    const mailoptions = {
      from: email,
      to: process.env.MY_EMAIL,
      subject:`${name}'s Requirement`,
      text: `Name:-${name}\n Email:-${email}\n Requirement:-${requirement}`,
      html:`<p>Name:-${name} <br/> Email:-${email} <br/> Requirement:-${requirement}</p>`,
      attachments: [
        {
          filename: Date.now() + "file" + req.file.originalname,
          path: req.file.path,
        }
    ]
    }
    config.sendMail(mailoptions, function(err, data) {
      if(err) {
        console.log(err);
        unlink(req.file.path)
          return res.status(400).json({status:false,message:"Can't send email"})
      } else {
        unlink(req.file.path)
        return res.status(200).json({status:true,message:"Email send sucessfully"})
      }
  });
  } catch (err) {
    unlink(req.file.path)
    return res.status(400).json({status:false,message:"Can't send email"})
  }
}
