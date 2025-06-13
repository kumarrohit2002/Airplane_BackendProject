const express=require('express');
const router=express.Router();

const {AirportController}=require('../../controllers');
const {AirportMiddlewares}=require('../../middlewares');

// -> /api/v1/airports POST
router.post('/',AirportMiddlewares.validateCreateRequirest,AirportController.createAirport);

// -> /api/v1/airports GET
router.get('/',AirportController.getAirports);

// -> /api/v1/airports/:id GET
router.get('/:id',AirportController.getAirport);

// -> /api/v1/airports/:id delete
router.delete('/:id',AirportController.destoryAirport);




module.exports=router;