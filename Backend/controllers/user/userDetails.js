const userModel = require("../../models/userModel")

async function userDetails(req,res){
    try {
        const user = await userModel.findById(req.userId)
        res.status(200).json({
            data:user,
            error:false,
            success:true,
            message:"Login user details"
        })
    } catch (error) {
        res.status(400).json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}

module.exports = userDetails