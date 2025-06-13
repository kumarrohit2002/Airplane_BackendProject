const {FlightRepository} =require('../repositories');

const flightRepository=new FlightRepository();
const AppError= require('../utils/errors/app-error');
const {StatusCodes} = require('http-status-codes');
const {compareTime}=require('../utils/helper/datetime-helper');
const {Op}=require('sequelize')


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


async function getAllFlights(query){
    let customFiltter={};
    let sortFiltter=[];
    const endingTripTime=" 23:59:59";

    //trips:- MUM-DEL
    if(query.trips){
        [departureAirportId,arrivalAirportId]=query.trips.split('-')
        //add the check the they are not same
        if(departureAirportId == arrivalAirportId){
            throw new AppError(['Departure and arrival airports must not be the same.'],StatusCodes.BAD_REQUEST);
        }
        customFiltter.departureAirportId=departureAirportId;
        customFiltter.arrivalAirportId=arrivalAirportId;
    }

    if(query.price){
        [minPrice,maxPrice]=query.price.split('-');
        customFiltter.price={
            [Op.between]:[((maxPrice==undefined)?0:minPrice),((maxPrice==undefined)?minPrice:maxPrice)]
        }
    }

    if(query.travellers){
        customFiltter.totalSeats={
            [Op.gte]:query.travellers
        }
    }

    if(query.tripDate){
        customFiltter.departureTime={
            [Op.between]:[query.tripDate,query.tripDate+endingTripTime]
        }
    }
    if(query.sort){
        const params=query.sort.split(',');
        const sortFilters=params.map((param)=>param.split('_'));
        sortFiltter=sortFilters
    }
    try{
        const flights=await flightRepository.getAllFlights(customFiltter,sortFiltter);
        return flights;

    }catch(error){
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError(['Can not fetch data of all Flights'], StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports={
    createFlight,
    getAllFlights
}