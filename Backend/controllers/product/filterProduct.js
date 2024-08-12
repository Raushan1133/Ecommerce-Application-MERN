const productModel = require("../../models/productModel");

const filterProduct = async (req,res)=>{
    try {
        const categoryList = req?.body?.category;
        const product = await productModel.find({
            category : {
                "$in":categoryList
            }
        })

        res.json({
            data : product,
            message:"Product list",
            error:false,
            success:true
        })
    } catch (error) {
        res.json({
            message:error.message || error,
            success:false,
            error:true
        })
    }
}

module.exports = filterProduct