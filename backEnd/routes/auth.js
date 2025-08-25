const express = require('express');
const router = express.Router();
const authTokenVerify = require('../middleware/authTokenVerify');
const Users = require('../models/Users');
const errorHandler = require('../middleware/errorHandler');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcript = require('bcrypt');
const generateID = require('../middleware/generateID');
const isValidEmail = require('../middleware/isValidEmail');

router.post('/google',async (req,res)=>{
    try{
        //check for boody
        if (!req.body){
            return errorHandler.insufficientInfo(res);
        }

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

        let user = await Users.findOne({
            where:{id:sub}
        });

        if (!user){
            await Users.create({
                id:sub,
                username:name,
                picture:user.picture,
                last_login: new Date(),
                created_at: new Date(),
            });

            user = await Users.findOne({
                where:{id:sub}
            });
        }
        else{
            await user.update({
                last_login: new Date()
            })
        }
        
        const Token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
            );
        
        const {id,picture,username} = user;
        console.log('New google user added!');
        res.status(200).json({message:'successful operation',token:Token,user:{id,picture,username}});
    }
    catch(error){
        console.log(error);
        errorHandler.serverError(res);
    }
})

router.post('/signIn',async (req,res)=>{
    try{
        //checking the availability of the request body
        if (!req.body){
            return errorHandler.insufficientInfo(res);
        }
        const {email,password,username} = req.body;
        if (!email || !password||!username){
            return errorHandler.insufficientInfo(res);
        }
        if (!isValidEmail(email)){
            return errorHandler.errorRes('invalid email',res);
        }

        const test = await Users.findOne({where:{username:username}});
        if (test){
            return errorHandler.errorRes('User already exists',res);
        }
        
        //hashing valuable information
        const H_email = await crypto.createHash('sha256').update(email).digest("hex"); //allows lookup in the db
        const H_password = await bcript.hash(password,12); //untracable even from the rainbow table

        //storing the user to db
        let sub = generateID(13);
        while (await Users.findOne({where:{id:sub}})) {
            sub = generateID();
        }

        await Users.create({
                id:sub,
                username:username,
                last_login: new Date(),
                created_at: new Date(),
                H_email:H_email,
                H_password:H_password
            });
            
        //generate token
        const Token = jwt.sign(
            { id: sub, username: username},
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
            );
        let id = sub;

        console.log('New user added!');
        res.status(200).json({message:'successful operation',token:Token,user:{id}});
    }
    catch(error){
        console.log(error);
        errorHandler.serverError(res);
    }
});
router.post('/logIn',async (req,res)=>{
    try{
        //checking the availability of the request body
        if (!req.body){
            return errorHandler.insufficientInfo(res);
        }
        const {email,password,username} = req.body;
        if ((!email && !username) || !password){
            return errorHandler.insufficientInfo(res);
        }

        let user;
        if (email){//email login
            if (!isValidEmail(email)){
                return errorHandler.errorRes('invalid email snytax',res);
            }
            const H_email = await crypto.createHash('sha256').update(email).digest("hex"); //allows lookup in the db
            user = await Users.findOne({where:{H_email:H_email}});
        }
        else{//username login
            user = await Users.findOne({where:{username:username}});
        }
        if (!user){
            return errorHandler.userNotFound(res);
        }
        //check password
        const user_pass = user.H_password;
        const authorize = await bcript.compare(password, user_pass); 
        if (!authorize){
            return errorHandler.errorRes('Invalid password',res);
        }
            
        //generate token
        const Token = jwt.sign(
            { id: user.id, username: username },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        const {id,picture} = user;
        
        console.log('log in successful');
        res.status(200).json({message:'successful operation',token:Token,user:{id,picture,username}});
    }
    catch(error){
        console.log(error);
        errorHandler.serverError(res);
    }
});

module.exports = router