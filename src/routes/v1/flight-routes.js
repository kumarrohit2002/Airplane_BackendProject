const express=require('express');
const router=express.Router();

const {FlightController}=require('../../controllers');
const {FlightMiddlewares}=require('../../middlewares');

// -> /api/v1/airports POST
router.post('/',FlightMiddlewares.validateCreateRequirest,FlightController.createFlight);

// -> /api/v1/flights?trips=BLR-DEL&price=2000-5500&travellers=122&tripDate=2025-07-02&sort=departureTime_ASC,price_DESC   GET
router.get('/',FlightController.getAllFlights);

// -> /api/v1/flights/id   GET
router.get('/:id',FlightController.getFlight);




module.exports=router;