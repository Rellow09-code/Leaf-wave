const express = require('express');
const router = express.Router();
const authTokenVerify = require('../middleware/authTokenVerify');
const User = require('../models/User');
const errorHandler = require('../middleware/errorHandler')

router.post('/',async (req,res)=>{
    try{
        const {token} = req.body;
        if (!token){
            return errorHandler.Token(res);
        }

        const payload = await authTokenVerify(token);
        if (!payload){
            return errorHandler.Token(res);
        }

        const {sub,email,name} = payload;


        const user = await User.findOne({
            where:{id:sub}
        })

        if (!user){
            await User.create({
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
        console.log('step4');

        res.status(200).json({message:'successful operation',token:token});
    }
    catch(error){
        console.log(error);
    }
})

module.exports = router