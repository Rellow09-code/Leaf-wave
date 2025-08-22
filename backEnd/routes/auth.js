const express = require('express');
const router = express.Router();
const authTokenVerify = require('../middleware/authTokenVerify');
const Users = require('../models/Users');
const errorHandler = require('../middleware/errorHandler');
const jwt = require('jsonwebtoken');

router.post('/',async (req,res)=>{
    try{
        //get the credential
        const {token} = req.body;
        if (!token){
            return errorHandler.Token(res);
        }

        const payload = await authTokenVerify(token);
        if (!payload){
            return errorHandler.Token(res);
        }

        const {sub,name} = payload;

        const user = await Users.findOne({
            where:{id:sub}
        })

        if (!user){
            await Users.create({
                id:sub,
                username:name,
                last_login: new Date(),
                created_at: new Date(),
            })
        }
        else{
            await user.update({
                last_login: new Date()
            })
        }
        
        const Token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
            );


        res.status(200).json({message:'successful operation',token:Token, user:user});
    }
    catch(error){
        console.log(error);
    }
})

module.exports = router