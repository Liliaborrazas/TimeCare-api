const mongoose = require('mongoose');
require('../configs/db.config');
const Event = require('../models/event.model');

// Event.remove({}).then(() => { console.log("Event removed") });

var event = [
    {
        title: "meetup",
        description: "maximo 4 niños",
        price: 50,
        days:"Monday",
        startTime: 9,
        endTime: 15
    },
    {
        title: "metoo",
        description: "cuido niños entre 0 a 3 años",
        price: 50,
        days:"Tuesday",
        startTime: 8,
        endTime: 14
    },
    {
        title: "time",
        description: "cuido niños entre 3 a 6 años",
        price: 50,
        days:"Tuesday",
        startTime: 13,
        endTime: 18
    }
    

    
]

Event.create(event)
  .then(() => {
    console.info("Seeds success!");
    mongoose.connection.close();
  })