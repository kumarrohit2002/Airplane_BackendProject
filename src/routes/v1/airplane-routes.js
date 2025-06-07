const express=require('express');
const router=express.Router();

const {AirplainController}=require('../../controllers');
const {AirplaneMiddlewares}=require('../../middlewares');

// -> /api/v1/airplanes POST
router.post('/',AirplaneMiddlewares.validateCreateRequirest,AirplainController.createAirplane);

// -> /api/v1/airplanes GET
router.get('/',AirplainController.getAirplanes);

// -> /api/v1/airplanes/:id GET
router.get('/:id',AirplainController.getAirplane);

// -> /api/v1/airplanes/:id delete
router.delete('/:id',AirplainController.destoryAirplane);




module.exports=router;