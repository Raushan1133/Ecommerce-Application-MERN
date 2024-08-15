const jwt = require('jsonwebtoken')
const userModel = require('../../models/userModel')
const bcryptjs = require('bcryptjs')
const resetPassword = async (req,res)=>{
    try {
        const {password,confirmPassword , userId, token} = req.body
        // const user = userModel.findById(userId);
        
        // Token verification
        jwt.verify(token,process.env.JWT_SECRET_KEY , function (error,decoded){
            if(error){
              return  res.json({
                message : "Link expired!",
                success:false,
                error:true
                })
            }
        })

        if(password){
            if(password !== confirmPassword){
                return res.json({
                    message :"Password and confirm password not matched",
                    error:true,
                    success:false
                })
            }else{
                const salt = bcryptjs.genSaltSync(10);
                const hashedPassword = bcryptjs.hashSync(password,salt);
    
                await userModel.findByIdAndUpdate(userId,{
                    $set:{
                        password:hashedPassword
                    }
                })

                res.json({
                    message:"Password reset successful",
                    success:true,
                    error:false
                })
        }

        }else{
            res.json({
                message: "Please create new password",
                error:true,
                success:false
            })
        }
        
    } catch (error) {
        res.json({
            message: error.message || error,
            success:false,
            error:true
        })
    }
}

module.exports = resetPassword