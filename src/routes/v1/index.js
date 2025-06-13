const express=require('express');
const router=express.Router();

const {infoController}=require('../../controllers');
const AirplainRoutes=require('./airplane-routes');
const CityRoutes=require('./city-routes');
const AiportRoutes=require('./airport-routes');
const FlightRoutes=require('./flight-routes')


router.use('/airplanes',AirplainRoutes);

router.get('/info',infoController.info);

router.use('/cities',CityRoutes);

router.use('/airports',AiportRoutes);

router.use('/flights',FlightRoutes);




module.exports=router;