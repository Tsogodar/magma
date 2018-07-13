const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const exphbs  = require('express-handlebars');
const db=require('./config/database');
const app = express();

app.use('/materialize', express.static(__dirname + '/node_modules/materialize-css/dist/'));

app.engine('.hbs', exphbs({
    extname: '.hbs',
    layoutsDir:path.join(__dirname, 'views'),
    partialsDir:[
        path.join(__dirname, 'views','auth','partials'),
        path.join(__dirname, 'views','dashboard','partials')
    ],
    defaultLayout:'layout.hbs',
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));
app.use('/dashboard', require('./controllers/dashboard'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: 'false'}));
app.use(express.static(path.join(__dirname, 'assets')));

app.use('/', require('./controllers/homePage'));

app.use((req, res) => {
   let error=new Error();
   error.status=404;
   res.render('errors/404');

});

module.exports = app;