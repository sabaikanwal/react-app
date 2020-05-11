const  express = require('express');
const app=express();
const mongoose=require('mongoose');
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

mongoose.connect('mongodb+srv://saba:123@cluster0-qw7s6.mongodb.net/test?retryWrites=true&w=majorit',
{useNewUrlParser:true}).then(() =>console.log('DB CONNECTED'))
                  .catch(err =>console.error(err));
                
app.get('/', (req, res) => {
 res.send('hello world')
    
});
app.listen(3000);
