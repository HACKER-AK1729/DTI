
class ExpressErr extends Error {
    constructor(statusCode, message){
        super();
        this.statusCode = statusCode;
        this.message = message;

        Error.captureStackTrace(this , this.contructor);



    }
}
module.exports=ExpressErr;
