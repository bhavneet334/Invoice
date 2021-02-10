const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Item = mongoose.model('Item');

router.get('/' , (req , res ) =>{
    res.render("item/addOrUpdate",{
        viewTitle : "Insert Item"
    });
});

router.post('/' , (req , res ) =>{
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});

function insertRecord(req, res) {
    var item = new Item();
    item.Sno = req.body.Sno;
    item.itemDescription = req.body.itemDescription;
    item.unitPrice = req.body.unitPrice;
    item.quantity = req.body.quantity;
    item.totalPrice = req.body.totalPrice;
    item.save((err, doc) => {
        if (!err)
            res.redirect('item/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("item/addOrUpdate", {
                    viewTitle: "Insert Item",
                    item: req.body
                });
            }
            else{
                console.log('Error during record insertion : ' + err);
            }
        }
    });
}
var total=0;

router.get('/list' , (req , res ) => {
     Item.find((err,docs) =>{
        if(!err){
            res.render("item/list",{
                list : docs
            });
        }else{
            console.log('Error in retrieving item list :' + err);
        }
    }).lean();
});

function handleValidationError(err,body){
    for(field in err.errors){
        switch(err.errors[field].path){
            case 'Sno':
                body['SnoError'] = err.errors[field].message;
                break;
            case 'itemDescription':
                body['itemDescriptionError'] = err.errors[field].message;
                break;
            case 'unitPrice':
                body['unitPriceError'] = err.errors[field].message;
                break;
            case 'quantity':
                body['quantityError'] = err.errors[field].message;
                break;
            case 'totalPrice':
                body['totalPriceError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

module.exports = router;
