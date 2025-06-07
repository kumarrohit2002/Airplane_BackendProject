const {StatusCodes}=require('http-status-codes');

const {AirplaneService} = require('../services');
const {ErrorResponse,SuccessResponse} =require('../utils/common');

/*
#post: /airplanes
#req.body={modelNumber:'airbus320' capacity:200}

*/
async function createAirplane(req,res){
    try{
        const {modelNumber,capacity}=req.body;
        if(!modelNumber || !capacity){
            ErrorResponse.message='All fields is Required';
            return res.status(StatusCodes.NOT_ACCEPTABLE).json(ErrorResponse);
        }
        const airplane=await AirplaneService.createAirplane({modelNumber:modelNumber,capacity:capacity});

        SuccessResponse.message='Successfully create an Airplane';
        SuccessResponse.data=airplane;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);

    }catch(error){
        ErrorResponse.error=error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

/*
#GET: /airplanes
#req.body={}

*/

async function getAirplanes(req,res){
    try{
        const airplanes=await AirplaneService.getAirplanes();
        SuccessResponse.message='Successfully get all Airplanes';
        SuccessResponse.data=airplanes;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }catch(error){
        ErrorResponse.error=error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

/*
#GET: /airplanes/:id
#req.body={}

*/
async function getAirplane(req,res){
    try{
        const airplanes=await AirplaneService.getAirplane(req.params.id);
        SuccessResponse.message='Successfully get Airplane';
        SuccessResponse.data=airplanes;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }catch(error){
        ErrorResponse.error=error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function destoryAirplane(req,res){
    try{
        const airplanes=await AirplaneService.destoryAirplane(req.params.id);
        SuccessResponse.message='Successfully delete Airplane';
        SuccessResponse.data=airplanes;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }catch(error){
        ErrorResponse.error=error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
    
}



module.exports={
    createAirplane,
    getAirplanes,
    getAirplane,
    destoryAirplane
}