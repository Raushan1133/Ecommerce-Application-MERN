const orderModel = require("../../models/orderProductModel")

const orderController =async (request,response) => {
    try {
        const currentUserId = request.userId
        const orderList = await orderModel.find({userId : currentUserId ,"paymentDetails.totalAmount" : {$ne : 0} }).sort({createdAt : -1});

        response.json({
            data: orderList,
            message:"Order list",
            success:true
        })
    } catch (error) {
        response.status(500).json({
            message : error.message || error,
            error:true,
            success : false
        })
    }
}

module.exports = orderController