const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const userSchema=mongoose.Schema({

    name: {
        type:String,
        maxlength:50
    },
    email:{
        type:String,
        trim:true,
        unique:1

    },
    password:{
        type:String,
        minlength:5
    },
    lastname:{
        type:String,
        maxlength:50
    },
    role:{
        type:Number,
        default:0
    },
    token:{
        type:String
    },
    tokenExp:{
        type:Number
    }
})
userSchema.pre('save', function(next){
    //this means user schema
    var user=this;
    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err, salt) {
            //this next means we are not going below and just save schema in mongodb
            if(err) return next(err);
            //if we didn't get any err we have to hash our password with salt
            //this hash is our password
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err);
                user.password=hash
                next() 
                // Store hash in your password DB.
            });
        });

    }else{
        next();
    }
    
});
userSchema.methods.comparePassword=function(plainpassword, cb){
    bcrypt.compare(plainpassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch)
    })
}
userSchema.methods.generateToken=function(cb){
    var user=this;
    //to make the token
    var token=jwt.sign(user._id.toHexString(), 'secret')
        user.token=token;
        user.save(function(err, user){
            if(err) return cb(err)
            cb(null, user);
        })
}
userSchema.static.findByToken=function(token, cb){
    var user=this;
    //we will find user id after decoding token
    jwt.verify(token, 'secret', function(err, decode){
        user.findOne({"_id":decode, "token":token}, function(err, user){
            if(err) return cb(err);
            cb(null, user)
        })
    })
}
const User=mongoose.model('User', userSchema)
module.exports={ User }