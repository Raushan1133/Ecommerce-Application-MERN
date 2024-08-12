const cartModel = require("../../models/cartProductModel")

const cartView = async (req,res) => {
    try {
        const currentUser = req.userId
        const allCartProducts = await cartModel.find({userId : currentUser}).populate("productId");
        res.json({
            data:allCartProducts,
            message:"ok",
            success:true,
            error:false
        })
    } catch (error) {
        res.json({
            message:error.message || error,
            error:true,
            success:false
        })


    }
}

module.exports = cartView