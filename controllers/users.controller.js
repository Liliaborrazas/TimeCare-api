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