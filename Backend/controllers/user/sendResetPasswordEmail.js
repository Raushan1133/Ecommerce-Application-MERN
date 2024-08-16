const  transporter  = require("../../config/emailConfig");
const userModel = require("../../models/userModel")
const jwt = require('jsonwebtoken')

const sendPasswordResetEmail = async (req,res)=>{
    try {
        const email = req.body.email;
        const user = await userModel.findOne({email});

        //Check user
        if(!user){
           return res.json({
            message : "User not found",
            error:true,
            success:false
            })
        }

        // Send password reset email
        const userId = user._id
        const token = jwt.sign({userId: user._id},process.env.JWT_SECRET_KEY,{expiresIn:'15m'});
        const link = `${process.env.FRONTEND_URL}/api/user/reset-password/${userId}/${token}`

        let info =await transporter.sendMail({
            from:process.env.EMAIL_FROM,
            to:user.email,
            subject:'Raushan Ecommerce Project - password reset link',
            html:`<a href=${link}>Click here </a> to Reset your password`
        });
        console.log(info);
        res.json({
            info:info,
            message:"Password reset link sent successfully, Please check your email ...",
            success:true,
            error:false
        })

    } catch (error) {
        res.json({
            message :error.message || error,
            success:false,
            error:true
        })
    }
}

module.exports = sendPasswordResetEmail