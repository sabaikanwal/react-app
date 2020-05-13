const  express = require('express');
const app=express();
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const config=require('./config/key');
const { User}=require('./models/user');
app.get('/', (req, res) => {
   res.json({"hello ~1":"h1 ~~"});
  
});
//const URI='mongodb+srv://sabai:database1122@cluster0-qw7s6.mongodb.net/test?retryWrites=true&w=majority';
//const connectDB= async() =>{
  //await mongoose.connect(URI);
//};////async () =>
//module.exports=connectDB;

    //await mongoose.connect(URI,{useUnifiedTopology:true,
    //useNewUrlParser:true})
    //ongoose.connection.on('error', function(error){
      //  console.log('database connection error:', error)
   // });
   // mongoose.connection.once('open', function(){
     //   console.log('database connected')
    //});
    //.then(console.log('db connected'))
    //.catch(err =>console.log(err));

mongoose.connect(config.mongoURI,
{useNewUrlParser:true,
  useUnifiedTopology: true 

}).then(() =>console.log('DB CONNECTED'))
                  .catch(err =>console.error(err));
                
app.get('/', (req, res) => {
 res.send('hello world')
    
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.post('/api/users/register', (req, res) => {
  
  const user=new User(req.body)
  user.save((err, userData) =>{
    if(err)
    return res.json({success:false, err})

  
  return res.status(200).json({
    success:true
  })
})
});
app.post('/api/user/login', (req,res)=>{
  //find email from the database
  User.findOne({email:req.body.email}, (err,user)=>{
    if(!user)
    return  res.json({
      loginSuccess:false,
      message:"Auth faild, email not found"
    });
    //compare password from database
    user.comparePassword(req.body.password, (err, isMatch) =>{
      if(!isMatch)
    return  res.json({
      loginSuccess:false,
      message:"wrong password"
    });

    })
     //genrate token
     user.generateToken((err, user) =>{
       if(err) return  res.status(400).send(err)
       res.cookie("x_auth", user.token)
       .status(200)
       .json({
         loginSuccess:true
       })

     })
  })
  
 
})
app.listen(3000);
