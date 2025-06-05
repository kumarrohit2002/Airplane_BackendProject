const {StatusCodes}=require('http-status-codes');
const {ErrorResponse}= require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreateRequirest(req,res,next){
    if(!req.body.modelNumber){
        ErrorResponse.message='something went worng while creating airplanes';
        ErrorResponse.error=new AppError(['Model Number not found in the oncoming reqest in the correct form'],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
} 

module.exports={
    validateCreateRequirest
}