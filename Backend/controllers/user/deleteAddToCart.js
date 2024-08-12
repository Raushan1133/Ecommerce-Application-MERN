const cartModel = require("../../models/cartProductModel")

const deleteAddToCart = async(req,res)=>{
    try {
        const currentUser = req.userId
        const productId = req.body._id

        const deleteProduct = await cartModel.deleteOne({_id:productId})
        res.json({
            message:"Product Deleted From Cart",
            error:false,
            success:true,
            data:deleteProduct
        })
    } catch (error) {
        res.json({
            message:error.message || error,
            success:false,
            error:true
        })
    }
}

module.exports = deleteAddToCart