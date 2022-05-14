const mongoose = require('mongoose')

const orderschema = new mongoose.Schema({
    order_id:{
        type: Number,
        required : true,
        trim: true,
        unique: true
    },
    item_name:{
        type: String,
        required: true,
        trim: true
    },
    cost:{
        type: Number,
        required: true,
        trim: true
    },
    order_date:{
        type: Date,
        required: true,
        trim: true
    },
    delivery_date:{
        type: Date,
        required: true,
        trim: true
    }
})

orderschema.statics.findByCredentials = async (order_id)=>{
    const order = await Order.findOne({ order_id })
    if (order) {
        throw new Error('order_id already exists in databse')
    }
    return order
}

orderschema.statics.findByOrderId = async (order_id)=>{
    const order = await Order.findOne({order_id})
    if(!order){
        throw new Error('order_id is incorrect')
        console.log('order_id is incorrect')
    }

    return order
}



const Order = mongoose.model('Order', orderschema)

module.exports = Order