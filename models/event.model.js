const mongoose = require('mongoose');


const eventSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, 'The title is required']
    },
    description: {
      type: String
    },

    price: {
        type: Number,
        
      },
      days: [{
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      }],

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