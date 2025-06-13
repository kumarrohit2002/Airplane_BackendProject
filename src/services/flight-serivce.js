const {FlightRepository} =require('../repositories');

const flightRepository=new FlightRepository();
const AppError= require('../utils/errors/app-error');
const {StatusCodes} = require('http-status-codes');
const {compareTime}=require('../utils/helper/datetime-helper');


async function createFlight(data){
    try{
        const {departureTime,arrivalTime}=data;
        if(compareTime(departureTime,arrivalTime)){ //departure < arrival
            throw new AppError(['Departure time must be before arrival time'], StatusCodes.BAD_REQUEST);
        }
        const flight=await flightRepository.create(data);
        return flight;
    }catch(error){
        if (error instanceof AppError) {
            throw error;
        }
        if(error.name == 'SequelizeValidationError'){
            let explanation=[];
            error.errors.forEach((err)=>{
                explanation.push(err.message);
            })
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError(['Cannot create a new Flight Object'], StatusCodes.INTERNAL_SERVER_ERROR);
       
    }
}





module.exports={
    createFlight,
}