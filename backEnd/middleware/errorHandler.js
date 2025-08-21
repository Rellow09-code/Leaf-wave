class errorHandler{
    static errorRes(message,res) {
        res.status(400).json({response:message})
    }
    static serverError(res){
        res.status(500).json({response:'Internal server error'})
    }
    static insufficientInfo(res){
        res.status(400).json({response:'Insufficient info provided by client'})
    }
    static userNotFound(res){
        res.status(400).json({response:'User does not exist'})
    }
    static Token(res){
        res.status(400).json({response:'Invalid token'})
    }
}

module.exports = errorHandler;