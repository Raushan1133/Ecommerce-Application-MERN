const cartModel = require("../../models/cartProductModel");

const addToCart = async(req,res)=>{
    try {
        const { productId } = req?.body;
        const userId = req?.userId;

        const isProductAvailable = await cartModel.findOne({productId,userId});
        if(isProductAvailable){
            return res.json({
                message:"Item Already Exists In Cart",
                success:false,
                error:true
            })
        }

        const payload = {
            productId : productId,
            quantity : 1,
            userId : userId
        }

        const newAddToCart = new cartModel(payload);
        const saveProduct = await newAddToCart.save();

       return res.json({
            data : saveProduct,
            message:"Item added to cart",
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

module.exports = addToCart