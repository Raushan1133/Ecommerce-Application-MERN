const userModel = require("../../models/userModel");

const updateUserProfile = async(req,res)=>{
    try {
        const id = req.userId       
        const updatedProfile = await userModel.findByIdAndUpdate(id,req.body);
        
        res.json({
            message : "Profile updated",
            success:true,
            error:false ,
            data : updatedProfile
        })


    } catch (error) {
        res.json({
            message:error.message || error,
            success:false,
            error:true
        })
    }
}

module.exports = updateUserProfile