const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ItemDB' , {useNewUrlParser : true} ,(err)=>{
    if(!err){
        console.log('MongoDB connection Succeeded');   
    }else{
        console.log('Error in connection DB : ' +err);
    }
});


require('./item.model');
