const express=require('express');
const router=express.Router();

const {AirplaneController}=require('../../controllers');
const {AirplaneMiddlewares}=require('../../middlewares');

// -> /api/v1/airplanes POST
router.post('/',AirplaneMiddlewares.validateCreateRequirest,AirplaneController.createAirplane);

// -> /api/v1/airplanes GET
router.get('/',AirplaneController.getAirplanes);

// -> /api/v1/airplanes/:id GET
router.get('/:id',AirplaneController.getAirplane);

// -> /api/v1/airplanes/:id delete
router.delete('/:id',AirplaneController.destoryAirplane);




module.exports=router;