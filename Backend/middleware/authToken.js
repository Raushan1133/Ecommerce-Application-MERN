const jwt = require('jsonwebtoken')
async function authToken (req,res,next){
    try {
        const token = req.cookies.token
        if(!token){
            return res.status(400).json({
                message:"Please Login First...",
                error:true,
                success:false
            })
        }
        jwt.verify(token,process.env.JWT_SECRET_KEY, function(err,decoded){
           if(err){
            console.log("Error auth",err)
           }

           req.userId = decoded?._id
           next()
        })

    } catch (error) {
        res.status(400).json({
            message:error.message,
            data:[],
            error:true,
            success:false
        })
    }
}

module.exports = authToken