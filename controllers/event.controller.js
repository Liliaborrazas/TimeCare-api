const mongoose = require('mongoose');
const Event = require('../models/event.model');
const ApiError = require('../models/api-error.model');

module.exports.list = (req, res, next) => {
    Event.find()
    .then(event => res.json(event))
    .catch(error => next(error));
  
}

/*module.exports.get = (req, res, next) => {
  const id = req.params.id;
  Event.findById(id)
    .then(event => {
      if (event) {
        res.json(event)
      } else {
        next(new ApiError(`Event not found`, 404));
      }
    }).catch(error => next(error));
}*/

/*module.exports.create = (req, res, next) => {
  const event = new Event(req.body);
  event.save()
  console.log("save")
    .then(() => {
      res.status(201).json(event);
      console.log("ten")
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        console.log(error);
        next(new ApiError(error.errors));
      } else {
        next(new ApiError(error.message, 500));
      }
    })
}*/