const {AirportRepository} =require('../repositories');

const airportRepository=new AirportRepository();
const AppError= require('../utils/errors/app-error');
const {StatusCodes} = require('http-status-codes');


async function createAirport(data){
    try{
        const airport=await airportRepository.create(data);
        return airport;
    }catch(error){
        if(error.name == 'SequelizeValidationError'){
            let explanation=[];
            error.errors.forEach((err)=>{
                explanation.push(err.message);
            })
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError(['Cannot create a new Airport Object'], StatusCodes.INTERNAL_SERVER_ERROR);
       
    }
}

async function getAirports(){
    try{
        const airports=await airportRepository.getAll();
        return airports;
    }catch(error){
        throw new AppError('Cannot fetch data of all the airports ',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirport(id){
    try{
        const airport=await airportRepository.get(id);
        return airport;
    }catch(error){
        
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw error;
        }
        throw new AppError('Cannot fetch data of all the airport ',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destoryAirport(id){
    try{
        const airports=await airportRepository.destroy(id);
        return airports;
    }catch(error){
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw error;
        }
        throw new AppError('Cannot fetch data of all the airports ',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports={
    createAirport,
    getAirports,
    getAirport,
    destoryAirport
}