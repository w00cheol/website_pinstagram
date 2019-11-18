var express        = require("express");
var mongoose       = require("mongoose");
var bodyParser     = require("body-parser");
var methodOverride = require("method-override");
var flash          = require("connect-flash");
var session        = require("express-session");
var passport       = require("./config/passport");
var app = express();
// DB setting
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true); //새로 추가한 부분

// mongoose.connect(process.env.MONGO_DB);
// mongodb+srv://hyein:guppy@cluster0-jxs17.mongodb.net/test?retryWrites=true&w=majority
// var DBserver = "mongodb+srv://woo:1234@cluster0-yiab6.azure.mongodb.net/test?retryWrites=true&w=majority";
// var DBserver = "mongodb://w00cheol:xCvmqG2z4WmC5Yv3V7lcbk12Yonbw0YHM5xOZMqR1V5dsoanuPC4OG9A2XYDdzPOvd67hNb9aiMJvx1YEM1rCQ==@w00cheol.documents.azure.com:10255/test?ssl=true&replicaSet=globaldb";
// mongoose.connect(DBserver);
// var db = mongoose.connection;
// db.once("open", function(){
//   console.log("DB connected");
// });
// db.on("error", function(err){
//   console.log("DB ERROR : ", err);
// });

mongoose.connect("mongodb://w00cheol.documents.azure.com:10255/test?ssl=true&replicaSet=globaldb", {
  auth: {
    user: 'w00cheol',
    password: 'xCvmqG2z4WmC5Yv3V7lcbk12Yonbw0YHM5xOZMqR1V5dsoanuPC4OG9A2XYDdzPOvd67hNb9aiMJvx1YEM1rCQ=='
  }
})
.then(() => console.log('Connection to CosmosDB successful'))
.catch((err) => console.error(err));

// Other settings
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(flash());
app.use(session({secret:"MySecret", resave:true, saveUninitialized:true}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Custom Middleware functions
app.use(function(req,res,next){
  res.locals.isAuthenticated = req.isAuthenticated(); //현재 로그인이 되어있는지 아닌지를 true, false로 return한다.
  res.locals.currentUser = req.user;
  next();
})//

// Routes
app.use("/", require("./routes/home"));
app.use("/posts", require("./routes/posts"));
app.use("/users", require("./routes/users"));

// Port setting
var port = 3000;
app.listen(port, function(){
  console.log("server on! http://localhost:"+port);
});
