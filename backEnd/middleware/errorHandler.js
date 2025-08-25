class errorHandler{
    static errorRes(message,res) {
        console.log(message);
        res.status(400).json({message:message});
    }
    static serverError(res){
        console.log('Internal server error');
        res.status(500).json({message:'Internal server error'});
    }
    static insufficientInfo(res){
        console.log('Insufficient info provided by client');
        res.status(400).json({message:'Insufficient info provided by client'});
    }
    static userNotFound(res){
        console.log('User does not exist');
        res.status(400).json({message:'User does not exist'});
    }
    static Token(res){
        console.log('Invalid token');
        res.status(400).json({message:'Invalid token'});
    }
}

module.exports = errorHandler;