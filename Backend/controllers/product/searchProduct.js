const productModel = require("../../models/productModel");

const searchProduct = async (req,res)=>{
    try {
        const query = req.query.q;
        const regex = new RegExp(query,"i","g"); //i for case sensitive, g for global search
        const product = await productModel.find({
            "$or":[
                {
                    productName:regex,
                },
                {
                    category:regex,
                },
                {
                    brandName:regex
                }
            ]
        })

        res.json({
            data : product,
            message:"Search Product list",
            success:true,
            error:false
        })
    } catch (error) {
        resizeBy.json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}

module.exports = searchProduct

