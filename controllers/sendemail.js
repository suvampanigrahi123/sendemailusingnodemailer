import nodemailer from "nodemailer"
import cloudinary from "cloudinary"
export const sendMail = async (req, res) => {
  
  try { 
    const {email,name,requirement,file} = req.body;
    const config = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMPT_MAIL,
        pass:process.env.SMPT_PASSWORD,
      }
    })
    const mycloud=await cloudinary.v2.uploader.upload(file,{
      folder:'avatars',
      width:150,
      crop:'scale'
  })

  
    const mailoptions = {
      from: email,
      to: process.env.MY_EMAIL,
      subject:`${name}'s Requirement`,
      text: `Name:-${name}\n Email:-${email}\n Requirement:-${requirement}`,
      html:`<p>Name:-${name} <br/> Email:-${email} <br/> Requirement:-${requirement}</p>`,
      attachments: [
        {
          filename: "image.png",
          path: mycloud.secure_url,
        }
    ]
    }
    config.sendMail(mailoptions, async function(err, data) {
      if(err) {
        await cloudinary.v2.uploader.destroy(mycloud.public_id);
          return res.status(400).json({status:false,message:"Can't send email"})
      } else {
        await cloudinary.v2.uploader.destroy(mycloud.public_id);
        return res.status(200).json({status:true,message:"Email send sucessfully"})
      }
  });
  } catch (err) {
    await cloudinary.v2.uploader.destroy(mycloud.public_id);
    return res.status(400).json({status:false,message:"Can't send email"})
  }
}
