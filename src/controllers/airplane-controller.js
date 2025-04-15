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
        console.log(error);
        ErrorResponse.message='Something went worng while creating Airplane';
        ErrorResponse.error=error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}



module.exports={
    createAirplane
}