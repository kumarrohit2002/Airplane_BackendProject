const {StatusCodes}=require('http-status-codes');

const {FlightService} = require('../services');
const {ErrorResponse,SuccessResponse} =require('../utils/common');

/*
#post: /flights
#req.body={lightNumber,airplaneId,departureAirportId,arrivalAirportId,arrivalTime,departureTime,price,boardingGate,totalSeats}

*/
async function createFlight(req,res){
    try{
        const {flightNumber,airplaneId,departureAirportId,arrivalAirportId,arrivalTime,departureTime,price,boardingGate,totalSeats}=req.body;

        const flight=await FlightService.createFlight({
            flightNumber:flightNumber, 
            airplaneId:airplaneId, 
            departureAirportId:departureAirportId, 
            arrivalAirportId:arrivalAirportId,
            arrivalTime:arrivalTime,
            departureTime:departureTime,
            price:price,
            boardingGate:boardingGate,
            totalSeats:totalSeats
        });

        SuccessResponse.message='Successfully create an Flight';
        SuccessResponse.data=flight;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);

    }catch(error){
        ErrorResponse.error=error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}




module.exports={
    createFlight,
}