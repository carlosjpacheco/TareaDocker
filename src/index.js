const express = require('express');
const app=express();
const path = require ('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');

require('./database');

//Settings

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.engine('.hbs', exphbs({
    defaultLayout : 'main',
    layoutsDir: path.join(app.get('views'),"layouts"),
    partialsDir: path.join(app.get('views'),'partials'),
    extname:'.hbs'
}));
app.set('view engine', '.hbs');


app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret:'mysecretapp',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());


app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});



//Rutas

app.use(require('./routes/index'));
app.use(require('./routes/tareas'));
app.use(require('./routes/users'));

app.use(express.static(path.join(__dirname,'public')));

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});