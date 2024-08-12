const cartModel = require("../../models/cartProductModel");

const countAddToCart = async (req,res)=>{
    try {
        const userId = req.userId;

        const count =await cartModel.countDocuments({
            userId:userId
        })

        res.json({
            data:{
                count:count,
            },
            message:"Ok",
            error:false,
            success:true
        })
    } catch (error) {
        res.json({
            message: error.message || error,
            error:true,
            success : false
        })
    }
}

module.exports = countAddToCart