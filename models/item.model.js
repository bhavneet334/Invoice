const mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
    Sno: {
       type:Number,
       required: 'This field is required.'
    },
    itemDescription: {
        type:String,
        required: 'This field is required.'
    },
    quantity: {
        type:Number,
        required: 'This field is required.'
    },
    unitPrice: {
      type: Number,
      required: 'This field is required.'
    },
    totalPrice:{
       type:Number,
       required: 'This field is required.'
    }

});

mongoose.model('Item' , ItemSchema);