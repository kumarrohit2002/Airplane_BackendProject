const CrudRepository =require('./curd-repository');
const {Flight,Airplane,Airport,City}=require('../models');
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
                    as:'airplaneDetail'
                },
                {
                    model:Airport,
                    required:true,
                    as:'departureAirport',
                    on:{
                        col:Sequelize.where(Sequelize.col('Flight.departureAirportId'),'=',Sequelize.col('departureAirport.code'))
                    },
                    include:{
                        model:City,
                        required:true
                    }
                },
                {
                    model:Airport,
                    required:true,
                    as:'arrivalAirport',
                    on:{
                        col:Sequelize.where(Sequelize.col('Flight.arrivalAirportId'),'=',Sequelize.col('arrivalAirport.code'))
                    },
                    include:{
                        model:City,
                        required:true
                    }
                }
        ]
        });
        return response;
    }
}

module.exports=FlightRepository;