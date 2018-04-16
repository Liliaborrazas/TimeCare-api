const express = require('express');
const router = express.Router();
const uploadConfig = require('../configs/multer.config');
const usersController = require('../controllers/users.controller');


router.post('/', usersController.create);
router.get('/', usersController.list);
router.get('/:id', usersController.get);
router.delete('/:id', usersController.delete);
router.put('/:id',  usersController.edit);
    
module.exports = router;