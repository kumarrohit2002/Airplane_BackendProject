const {StatusCodes}=require('http-status-codes');
const {ErrorResponse}= require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreateRequirest(req,res,next){
    if(!req.body.flightNumber){
        ErrorResponse.message='something went worng while creating airport';
        ErrorResponse.error=new AppError(['Flight flightNumber not found in the oncoming request in the correct form'],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.airplaneId){
        ErrorResponse.message='something went worng while creating airport';
        ErrorResponse.error=new AppError(['airplaneId not found in the oncoming request in the correct form'],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.departureAirportId){
        ErrorResponse.message='something went worng while creating airport';
        ErrorResponse.error=new AppError(['departureAirportId not found in the oncoming request in the correct form'],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.arrivalAirportId){
        ErrorResponse.message='something went worng while creating airport';
        ErrorResponse.error=new AppError(['arrivalAirportId not found in the oncoming request in the correct form'],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.arrivalTime){
        ErrorResponse.message='something went worng while creating airport';
        ErrorResponse.error=new AppError(['arrivalTime not found in the oncoming request in the correct form'],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.departureTime){
        ErrorResponse.message='something went worng while creating airport';
        ErrorResponse.error=new AppError(['departureTime not found in the oncoming request in the correct form'],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.price){
        ErrorResponse.message='something went worng while creating airport';
        ErrorResponse.error=new AppError(['price not found in the oncoming request in the correct form'],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.totalSeats){
        ErrorResponse.message='something went worng while creating airport';
        ErrorResponse.error=new AppError(['totalSeats not found in the oncoming request in the correct form'],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
} 

module.exports={
    validateCreateRequirest
}