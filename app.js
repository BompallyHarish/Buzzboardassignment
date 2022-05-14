const express = require('express')
require('./db/mongoose.js')
const orderRouter = require('./routers/orders')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(orderRouter)


app.listen('3000',()=>{
    console.log('server started listnening to port 3000')
})

