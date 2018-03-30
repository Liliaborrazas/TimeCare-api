    const express = require('express');
    const router = express.Router();
    const uploadConfig = require('../configs/multer.config');
    const eventController = require('../controllers/event.controller');
    const eventMiddleware = require('../middleware/event.middleware');
    const secureMiddleware = require('../middleware/secure.middleware');
    
    router.get('/',secureMiddleware.isAuthenticated, eventController.list);
    router.get('/:id', secureMiddleware.isAuthenticated, eventMiddleware.checkValidId, eventController.get);
    router.post('/', secureMiddleware.isAuthenticated, eventController.create);
    module.exports = router;