const CrudRepository =require('./curd-repository');
const {Flight}=require('../models');

class FlightRepository extends CrudRepository{
    constructor(){
        super(Flight);
    }

    async getAllFlights(flitter,sort){
        const response=await Flight.findAll({
            where:flitter,
            sort:sort
        });
        return response;
    }
}

module.exports=FlightRepository;