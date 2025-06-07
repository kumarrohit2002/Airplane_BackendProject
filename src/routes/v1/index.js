const express=require('express');
const router=express.Router();

const {infoController}=require('../../controllers');
const AirplainRoutes=require('./airplane-routes');
const CityRoutes=require('./city-routes');


router.use('/airplanes',AirplainRoutes);

router.get('/info',infoController.info);

router.use('/cities',CityRoutes)




module.exports=router;