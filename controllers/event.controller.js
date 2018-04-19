const mongoose = require('mongoose');
const Event = require('../models/event.model');
const Valoration = require('../models/valoration.model');
const ApiError = require('../models/api-error.model');

module.exports.list = (req, res, next) => {
    Event.find()
    .then(event => res.json(event))
    .catch(error => next(error));
}

module.exports.get = (req, res, next) => {
  const id = req.params.id;
  Event.findById(id)
    .populate("valorations")
    .then(event => {
      if (event) {
        res.json(event)
      } else {
        next(new ApiError(`Event not found`, 404));
      }
    }).catch(error => next(error));
}

module.exports.create = (req, res, next) => {
  console.log("Entro al create");
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
  // TODO: Crear un objeto con los parámetros que necesito de req.body
  // Añadir el objeto como parámetro en el update
  // const {name, surname, title} = req.body
  // const updates = {name, surname, title};
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


// { $push: { 'valorations': valoration._id }}

module.exports.addValoration = (req, res, next) => {
  const creator = req.user && req.user._id;
  const ratedUser = req.params && req.params.id;
  const { 
    description, 
    generalRating, 
    valorationPrice, 
    punctuality, 
    trust, 
  } = req.body;
  //const newValoration = new Valoration(req.body.)
  // Recives un req.body con la valoracion y la id del evento
  const eventId = req.params.id;
  Event.findById(eventId)
    .then(event => {
      const valorationBody = {
        generalRating,
        description,
        valorationPrice,
        punctuality,
        trust, 
        creator,
        ratedUser
      };
      const newValoration = new Valoration(valorationBody);

      newValoration.save()
        .then(valoration => {
          Event.findByIdAndUpdate( eventId, { $push: { 'valorations': valoration._id } })
            .then(eventUpdated => {
              res.status(201).json(eventUpdated)
            })
            .catch(error => {
              if (error instanceof mongoose.Error.ValidationError) {
                next(new ApiError(error.errors));
              } else {
                next(new ApiError(error.message, 500));
              }
            })
        })
        .catch(error => {
          if (error instanceof mongoose.Error.ValidationError) {
            next(new ApiError(error.errors));
          } else {
            next(new ApiError(error.message, 500));
          }
        })
    })
}