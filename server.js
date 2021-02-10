require('./models/db');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');

const itemController = require('./controllers/itemController');

var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(bodyparser.json());
app.set('views',path.join(__dirname,'/views/'));
app.engine('hbs' , exphbs({extname : 'hbs', defaultLayout: 'mainLayout' , layoutsDir : __dirname + '/views/layouts/'}));
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

app.listen(3000 , ()=>{
    console.log('Express Server started at port : 3000 ');
});

app.use('/item',itemController);
