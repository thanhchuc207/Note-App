require('dotenv').config();

const express=require('express');
const expressLayouts=require('express-ejs-layouts');
const methodOverride=require('method-override');
const connectDB=require('./server/config/db');
const session=require('express-session');
const passport=require('passport');
const MongoStore=require('connect-mongo');


const app=express();
const port= 5000 || process.env.PORT ;

app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:true,
    store:MongoStore.create({
        mongoUrl:process.env.MONGODB_URI
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"));

//connect to db
connectDB();

//Static files
app.use(express.static('public'));


// redirect CSS bootstrap
app.use("/css",express.static("./node_modules/bootstrap/dist/css"));
app.use("/",express.static("./node_modules/bootstrap/dist/"));

//templating engine
app.use(expressLayouts);
app.set('layout','./layouts/main');
app.set('view engine','ejs');

//route
app.use('/',require('./server/routes/auth'));
app.use('/',require('./server/routes/index'));
app.use('/',require('./server/routes/dashboard'));


//handle 404
app.get('*',function(req,res){
    res.status(404).render('404')
})



app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});