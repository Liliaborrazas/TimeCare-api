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
      image: {
        type: String,
        default: ''
    },

      startTime: {
        type: Number,
        required: [true, 'Start time is required']
      },
      endTime: {
        type: Number,
        required: [true, 'End time is required']
      },
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