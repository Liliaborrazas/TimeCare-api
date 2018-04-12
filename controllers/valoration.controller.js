const mongoose = require('mongoose');
const Valoration = require('../models/valoration.model');
const ApiError = require('../models/api-error.model');

module.exports.create = (req, res, next) => {
    req.body.userId = req.params.id
    const valoration = new Valoration(req.body);
    valoration.save()
    .then(() => {
      res.status(201).json(valoration);
      
    })
    .catch(error => {
        if (error instanceof mongoose.Error.ValidationError) {
          console.log(error);
          next(new ApiError(error.errors));
        } else {
          next(new ApiError(error.message, 500));
        }
      })
  }

  module.exports.edit = (req, res, next) => {
    const {id} = req.params;
    if (req.file) {
      body.image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }
    
    Valoration.findByIdAndUpdate(id, { $set: req.body }, { new: true })
      .then(valoration => {
        if (valoration) {
          res.json(valoration)
        } else {
          next(new ApiError(`Valoration not found`, 404));
        }
      }).catch(error => {
        if (error instanceof mongoose.Error.ValidationError) {
          next(new ApiError(error.message, 400, error.errors));
        } else {
          next(new ApiError(error.message, 500));
        }
      });
  }

  module.exports.delete = (req, res, next) => {
    const {id} = req.params;
    Valoration.findByIdAndRemove(id)
      .then(valoration => {
        if (valoration) {
          res.status(204).json()
        } else {
          next(new ApiError(`Valoration not found`, 404));
        }
      }).catch(error => next(error));
  }