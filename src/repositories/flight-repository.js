const CrudRepository =require('./curd-repository');
const {Flight,Airplane,Airport}=require('../models');
const {Sequelize}=require('sequelize')

class FlightRepository extends CrudRepository{
    constructor(){
        super(Flight);
    }

    async getAllFlights(flitter,sort){
        const response=await Flight.findAll({
            where:flitter,
            sort:sort,
            include:[
                {
                    model:Airplane,
                    required:true,
                    as:'airplane_detail'
                },
                {
                    model:Airport,
                    required:true,
                    as:'departure_airport',
                    on:{
                        col:Sequelize.where(Sequelize.col('Flight.departureAirportId'),'=',Sequelize.col('departure_airport.code'))
                    }
                },
                {
                    model:Airport,
                    required:true,
                    as:'arrival_airport',
                    on:{
                        col:Sequelize.where(Sequelize.col('Flight.arrivalAirportId'),'=',Sequelize.col('arrival_airport.code'))
                    }
                }
        ]
        });
        return response;
    }
}

module.exports=FlightRepository;