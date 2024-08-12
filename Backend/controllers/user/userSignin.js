const userModel = require('../../models/userModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
async function userSignIn(req,res){
    try {
        const {email , password} = req.body;
        if(!email){
            throw new Error("Please provide email!");
        }
        if(!password){
            throw new Error("Please provide password!");
        }

        const user= await userModel.findOne({email})
        if(!user){
            throw new Error("User not found")
        }

        const isMatch = await bcrypt.compareSync(password,user.password);
        if(isMatch){
            const tokenData = {
                _id:user._id,
                email:user.email
            }
         const token = await jwt.sign(tokenData,process.env.JWT_SECRET_KEY,{expiresIn:'30d'});
         const tokenOption = {
            httpOnly:true,
            secure:true,
            sameSite : 'None',
            Secure
         }
         res.cookie("token",token,tokenOption).status(200).json({
            message:"Login Successfully",
            data:token,
            success:true,
            error:false
         })
        }else{
            throw new Error("Please check the password.")
        }
    } catch (error) {
        console.log(error)
        res.json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}

module.exports = userSignIn