
class CustomError extends Error{
    constructor(status, msg){
        super(msg);

        this.statusCode = status;
        this.msg = msg;
    }

    static createError(status, err){
        const _message = CustomError.getMessage(err);

        return new CustomError(status, _message); 
    }

    static getMessage(err){
        console.log(typeof(err));
        
        
        if (typeof err === 'string'){
            console.log(err);
            return err;
        } else if (err instanceof Error){
            if (err.errors && err.errors.length > 0){
                return CustomError.getMessage(err.errors[0]);
            }
            return CustomError.getMessage(err.message);
        }else{
            return "Something went wrong"
        }
    }
}


function handleError(err, req, res, next){
    console.log("Error catched");
    console.log(`${err.statusCode}:: ${err.msg || err.status}`)
    console.log(err)

    if (err instanceof CustomError){
        res.status(err.statusCode).send({
            error:{
                msg: err.msg,
                status: err.statusCode
            }
        });
    }else{
        res.status(err.statusCode || 500).send({
            error: {
                msg: err.Status || "Something wrong happened",
                status: err.statusCode || 500
            }
        })
    }

    next();
}


module.exports = {
    CustomError,
    handleError
}