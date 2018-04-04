const mongoose = require('mongoose');
const Event = require('../models/event.model');
const ApiError = require('../models/api-error.model');

module.exports.list = (req, res, next) => {
    Event.find()
    .then(event => res.json(event))
    .catch(error => next(error));
  
}

module.exports.get = (req, res, next) => {
  const id = req.params.id;
  Event.findById(id)
    .then(event => {
      if (event) {
        res.json(event)
      } else {
        next(new ApiError(`Event not found`, 404));
      }
    }).catch(error => next(error));
}


module.exports.create = (req, res, next) => {
  const event = new Event(req.body);
  event.save()
  .then(() => {
    res.status(201).json(event);
    console.log("ten")
  })
  .catch(error => {
    console.log("uueueueueue")
      if (error instanceof mongoose.Error.ValidationError) {
        console.log(error);
        next(new ApiError(error.errors));
      } else {
        next(new ApiError(error.message, 500));
      }
    })
}
module.exports.delete = (req, res, next) => {
  const id = req.params.id;
  Event.findByIdAndRemove(id)
    .then(event => {
      if (event) {
        res.status(204).json()
      } else {
        next(new ApiError(`Event not found`, 404));
      }
    }).catch(error => next(error));
}
module.exports.edit = (req, res, next) => {
  const id = req.params.id;
  if (req.file) {
    body.image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  }
  
  Event.findByIdAndUpdate(id, { $set: req.body }, { new: true })
    .then(event => {
      if (event) {
        res.json(event)
      } else {
        next(new ApiError(`Event not found`, 404));
      }
    }).catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        next(new ApiError(error.message, 400, error.errors));
      } else {
        next(new ApiError(error.message, 500));
      }
    });
}