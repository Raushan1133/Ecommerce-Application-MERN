const cartModel = require("../../models/cartProductModel");

const updateCart = async(req,res)=>{
    try {
        const currentUser = req?.userId
        const cartProductId = req?.body?._id;
        const qty = req.body.quantity
        const updateProduct =await cartModel.updateOne({_id:cartProductId},{
            
            ...(qty && {quantity : qty})
        }) 

        res.json({
            message: "Product updated",
            data:updateProduct,
            error:false,
            success:true
        })
    } catch (error) {
        res.json({
            message:error.message,
            error:true,
            success:false
        })
    }
}

module.exports = updateCart