import userModel from "../models/user.model.js";
import bcrypt  from "bcrypt"
import jwt from "jsonwebtoken"
import   config from "../config/config.js"

async function sendTokenResponse(user){
    const token = jwt.sign({
        id:user._id
    }, config.JWT_SECRET, { expiresIn: "7d" })


    res.cookie("token",token)

     res.status(200).json({
        msg:"user register sucessfully ",
        token,
        user:{
            id:user._id,
            email:user.email,
            fullname:user.fullname,
            contact:user.contact,
            role:user.role
        }
     })
}

const registerController=async(req,res)=>{

    const {email,contact,fullname,password,isSeller} = req.body;
    try{
       const  existinguser =await userModel.findOne({$or:[{email: email}, {contact: contact}]})


        if(existinguser){
        return res.status(400).json({msg:"user already exits with this email or contact number"})
        }

        const user= await usermodel.create({
            email,
            password,
            fullname,
            contact,
            role: isSeller?"seller":"buyer"
        })

       await sendTokenResponse(user,res,"user register successfully ")

    }catch(error){
        console.log(error);
        
       return res.status(500).json({
            msg:"Error occurred while registering user"
        })
    }
}


export default { registerController }