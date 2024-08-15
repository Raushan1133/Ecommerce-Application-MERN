const orderModel = require("../../models/orderProductModel");
const userModel = require("../../models/userModel");

const allOrders = async(req,res)=>{
    try {
        const currUser = req.userId;

        const user = await userModel.findById({_id : currUser});

        if(user.role !== "ADMIN"){
            return res.json({
                message : "Not authorised user",
                success:false,
                error:true
            })
        }

        const orders = await orderModel.find().sort({createdAt : -1});

        res.json({
            data:orders,
            message: "All orders",
            success:true,
            error:false
        })


    } catch (error) {
        res.json({
            message:error.message || error,
            success:false,
            error:true
        })
    }
}

module.exports = allOrders