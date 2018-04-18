const mongoose = require('mongoose');


const valorationSchema = new mongoose.Schema({
    
    generalRating:{
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    
    valorationPrice: {
        type: Number,
        min: 0,
        max: 5,
        required: true
        
    },
    punctuality: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },

    trust: {
        type: Number,
        min: 0,
        max: 5,
        required: true

    },
    
    description: {
      type: String
    },
    userCreator: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    userRating: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    }
      
      
    }, { 
        timestamps: true,
        toJSON: {
          transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            return ret;
          }
        }
      });

const Valoration = mongoose.model('Valoration', valorationSchema);
module.exports = Valoration;