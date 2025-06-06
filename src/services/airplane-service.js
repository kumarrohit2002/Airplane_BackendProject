const {AirplaneRepository} =require('../repositories');

const airplaneRepository=new AirplaneRepository();
const AppError= require('../utils/errors/app-error');
const {StatusCodes} = require('http-status-codes');


async function createAirplane(data){
    try{
        const airplane=await airplaneRepository.create(data);
        return airplane;
    }catch(error){
        if(error.name == 'SequelizeValidationError'){
            let explanation=[];
            error.errors.forEach((err)=>{
                explanation.push(err.message);
            })
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError(['Cannot create a new Airplane Object'], StatusCodes.INTERNAL_SERVER_ERROR);
       
    }
}

async function getAirplanes(){
    try{
        const airplanes=await airplaneRepository.getAll();
        return airplanes;
    }catch(error){
        throw new AppError('Cannot fetch data of all the airplanes ',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplane(id){
    try{
        const airplanes=await airplaneRepository.get(id);
        return airplanes;
    }catch(error){
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw error;
        }
        throw new AppError('Cannot fetch data of all the airplanes ',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destoryAirplane(id){
    try{
        const airplanes=await airplaneRepository.destroy(id);
        return airplanes;
    }catch(error){
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw error;
        }
        throw new AppError('Cannot fetch data of all the airplanes ',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports={
    createAirplane,
    getAirplanes,
    getAirplane,
    destoryAirplane
}