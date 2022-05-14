const express = require('express')
const Order = require('../models/orders')
const router = new express.Router()


//1. Creating a new order
router.post('/orders/create',async (req,res)=>{
    const order = new Order(req.body)
    try {
        const ordercheck = Order.findByCredentials(order.order_id) 
        if(ordercheck){
            return res.send('order already exitsing in database')
        }
        await order.save()
        res.status(201).send(order)
    } catch (error) {
        
    }
})

//2.Update the order for a specific order ID to update the delivery_date based on the updated value provided to the API

router.patch('/orders/update/:order_id', async (req,res)=>{
    const updates = Object.keys(req.body)
    try{
        const order = await Order.findOneAndUpdate({order_id:req.params.order_id}, req.body, {new: true, runValidators: true })
        //updates.forEach((update)=>order[update] = req.body[update])
        await order.save()
        if(!order){
        return res.status(404).send()
        }
        res.status(200).send(order)
    }
    catch(e){
        res.status(400).send(e)
    }
})

//3.List all orders for a given date in yyyy/mm/dd format.

router.get('/orders/list', async (req,res)=>{
    try{
        const orders =  await Order.find({})
        res.status(200).send(orders)
    }
    catch(e){
        res.status(500).send(e)
    }
})

//4.Query for a specific order with Order ID

router.post('/orders/search', async (req,res)=>{
    try{
        const order = await Order.find({order_id:req.body.order_id})
        res.status(200).send(order)
    }
    catch(e){
        res.status(400).send(e)
    }
})


//5.Delete an order with Order ID.

router.delete('/orders/delete/:order_id', async(req,res)=>{
    const order_id = req.params.order_id
   try{
       const order = await Order.deleteOne({order_id:req.params.order_id})
       if(!order){
       return res.status(404).send('order id not found')
       }
       res.status(200).send(order)
   }

   catch(e){
       res.status(400).send(e)
   }
    
})

module.exports= router