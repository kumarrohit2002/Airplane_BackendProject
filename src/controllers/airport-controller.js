const {StatusCodes}=require('http-status-codes');

const {AirportService} = require('../services');
const {ErrorResponse,SuccessResponse} =require('../utils/common');

/*
#post: /airports
#req.body={name:'IGI', code:'DEL, address:'PATANA ..', cityId:2}

*/
async function createAirport(req,res){
    try{
        const {name,code,address,cityId}=req.body;
        const airport=await AirportService.createAirport({name:name, code:code, address:address, cityId:cityId});

        SuccessResponse.message='Successfully create an Airport';
        SuccessResponse.data=airport;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);

    }catch(error){
        ErrorResponse.error=error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

/*
#GET: /airports
#req.body={}

*/

async function getAirports(req,res){
    try{
        const airports=await AirportService.getAirports();
        SuccessResponse.message='Successfully get all Airports';
        SuccessResponse.data=airports;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }catch(error){
        ErrorResponse.error=error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

/*
#GET: /airports/:id
#req.body={}

*/
async function getAirport(req,res){
    try{
        const airport=await AirportService.getAirport(req.params.id);
        SuccessResponse.message='Successfully get Airport';
        SuccessResponse.data=airport;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }catch(error){
        ErrorResponse.error=error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function destoryAirport(req,res){
    try{
        const airports=await AirportService.destoryAirport(req.params.id);
        SuccessResponse.message='Successfully delete Airport';
        SuccessResponse.data=airports;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }catch(error){
        ErrorResponse.error=error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
    
}



module.exports={
    createAirport,
    getAirports,
    getAirport,
    destoryAirport
}