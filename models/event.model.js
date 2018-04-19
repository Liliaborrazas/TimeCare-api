const mongoose = require('mongoose');


const eventSchema = new mongoose.Schema({
    title: {
      type: String,
      
    },
    description: {
      type: String
    },

    price: {
        type: Number
        
      },
    days: [{
      type: Date
    
    }],

    valorations: {
      type:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Valoration'
      }],
      default: [],
    },
      
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },

    startTime: {
      type: String
    },

    endTime: {
      type: String
    },
    email: {
      type: String
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

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;