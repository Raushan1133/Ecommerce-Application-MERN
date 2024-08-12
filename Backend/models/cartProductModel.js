const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    productId : {
        ref:'product',
        type:String
    },
    quantity : Number,
    userId : String
},
{
    timestamps:true
}
)

const cartModel = mongoose.model('userCart',cartSchema)
module.exports = cartModel