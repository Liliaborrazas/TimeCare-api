    const express = require('express'); 
    const router = express.Router();
    const uploadConfig = require('../configs/multer.config');
    const valorationController = require('../controllers/valoration.controller');
    const valorationMiddleware = require('../middleware/valoration.middleware');
    const secureMiddleware = require('../middleware/secure.middleware');
    


    router.post('/:id', secureMiddleware.isAuthenticated, valorationController.create);


    module.exports = router;