const mongoose = require('mongoose');
const User = require('../models/user.model');
const ApiError = require('../models/api-error.model');

module.exports.create = (req, res, next) => {
  console.log('llego');
  req.body.role = req.body.role.toLowerCase();
  User.findOne({
      email: req.body.email
    })
    .then(user => {
      console.log('then');
      if (!user) {
        user = new User(req.body);
        user.save()
          .then(() => {
            res.json(user);
          })
          .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
              next(new ApiError(error.message, 400, error.errors));
            }
            next(error);
          });
      } else {
        next(new ApiError('User already registered', 400));
      }
    }).catch(error => next(new ApiError('User already registered', 500)));
}

module.exports.list = (req, res, next) => {
  User.find()
  .then(user => res.json(user))
  .catch(error => next(error));
}

module.exports.get = (req, res, next) => {
const id = req.params.id;
User.findById(id)
  .then(user => {
    if (user) {
      res.json(user)
    } else {
      next(new ApiError(`User not found`, 404));
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
  User.findByIdAndUpdate(id, { $set: req.body }, { new: true })
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        next(new ApiError(`User not found`, 404));
      }
    }).catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        next(new ApiError(error.message, 400, error.errors));
      } else {
        next(new ApiError(error.message, 500));
      }
    });
}