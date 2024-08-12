const productModel = require("../../models/productModel")

const getProduct = async(req,res)=>{
    try {
        const allProduct = await productModel.find().sort({createdAt: -1})
        res.json({
            message:"All products",
            success:true,
            error:false,
            data:allProduct
        })
    } catch (error) {
        res.status(400).json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}

module.exports = getProduct