const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema   = mongoose.Schema;
const SALT_WORK_FACTOR = 10;



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Username is required'],
        
    },
    email: {
        type: String,
        lowercase: true,
        required: [true, 'Email is required'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        unique: true
      },
    password: {
        type: String,
        required: [true, 'User needs a password']
      },
    
    role: {
        type: String,
        enum: ['carer', 'parent'],

    },
    image: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        
    },
    price:{
        type: Number,
        default: 0,
        
    },
    description:{
        type: String,
        
    },
    rating:{
        type: Number,
    }

}, 
{ timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        return ret;
      }
      }
    });

    userSchema.pre('save', function(next) {
        const user = this;
    
        if (!user.isModified('password')) {
            return next();
        }
    
        bcrypt.genSalt(SALT_WORK_FACTOR)
        .then(salt => {
          bcrypt.hash(user.password, salt)
            .then(hash => {
              user.password = hash;
              return next();
            })
            .catch(err => next(err));
        })
        .catch(err => next(err));
    });
    
    userSchema.methods.checkPassword = function(password) {
        return bcrypt.compare(password, this.password);
    }
    
    const User = mongoose.model('User', userSchema);
    module.exports = User;