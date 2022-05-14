const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/buzzboard',{
    useUnifiedTopology: true
}).then((result)=>{
    console.log('connected to buzzboard database successfully')
}).catch((error)=>{
    console.log(error)
})


