const { where } = require('sequelize');
const {Logger} =require('../config/logger-config');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');

class CrudRepository{
    constructor(model){
        this.model=model;
    }

    async create(data){
        const response=await this.model.create(data);
        return response;
       
    }


    async destroy(data){
        const response=await this.model.destroy({
            where:{
                id:data
            }
        });
        if(!response){
            throw new AppError('The airplane you requested to delete is not present',StatusCodes.NOT_FOUND);
        }
        return response;
    }

    
    async get(data){
        const response=await this.model.findByPk(data);
        if(!response){
            throw new AppError('The airplane you requested is not present',StatusCodes.NOT_FOUND);
        }
        return response;
    }

    async getAll(){
        const response=await this.model.findAll();
        return response;
    }

    async update(id,data){ //data:{col:val,.....}
        const response=await this.model.update(data,{
            where:{
                id:id
            }
        });
        return response;
    }
}

module.exports=CrudRepository;