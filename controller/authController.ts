
import userModel, { interUser } from "../model/user";
import { NextFunction, Request, Response } from "express";
import { Document } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { hash } from "crypto";


const register = async (req: Request, res: Response) => {
    const user: interUser = req.body;
    const email= req.body.email;
    const password= req.body.password;
    const salt= await bcrypt.genSalt(10);
    var hashedPassword;
    if(password){
        hashedPassword= await bcrypt.hash(password,salt);
    }
    else{
        hashedPassword="";
    }
    const emailExists=await userModel.findOne({email:email});
    if(emailExists){
        res.status(400).send("User already exists");
        return;
    }
    try {
        const savedUser = await userModel.create({
            email: req.body.email,
            password: hashedPassword,
        });
        res.status(200).send(savedUser);
    } catch (error) {
        res.status(400).send(error);
    }
}

type tTokens = {
    accessToken: string,
    refreshToken: string
}
const generateToken = (userId: string): tTokens | null => {
    if (!process.env.TOKEN_SECRET) {
        return null;
    }
    // generate token
    const random = Math.random().toString();
    const accessToken = jwt.sign({
        _id: userId,
        random: random
    },
    
        process.env.TOKEN_SECRET,
        { expiresIn: process.env.TOKEN_EXPIRES });
    const refreshToken = jwt.sign({
        _id: userId,
        random: random
    },
        process.env.TOKEN_SECRET,
        { expiresIn: process.env.TOKEN_EXPIRES});
    return {
        accessToken: accessToken,
        refreshToken: refreshToken
    };
};
const login = async (req: Request, res: Response) => {
    try{
    const user: interUser = req.body;
    const email= req.body.email;
    const password= req.body.password;
    const userExists=await userModel.findOne({email:email
    });
    if(!userExists){
        res.status(400).send("Username or pasword is incorrect");
        return;
    }
    else{
        const validPassword= await bcrypt.compare(password,userExists.password);
        if(!validPassword){
            res.status(400).send("Username or pasword is incorrect");
            return;
        }
        if (!process.env.TOKEN_SECRET) {
            res.status(500).send("Server error");
            return;
        }
        const tokens=generateToken(userExists._id);
        if (!tokens) {
            res.status(500).send('Server Error');
            return;
        }
        if (!userExists.refreshToken) {
            userExists.refreshToken = [];
        }
        userExists.refreshToken.push(tokens.refreshToken);
        await userExists.save();
        res.status(200).send(
            {
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
                _id: userExists._id
            });


        }
    

    }catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
};
type Payload = {
    _id: string,
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header('authorization');
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        res.sendStatus(401);
        return;
    }
    if (!process.env.TOKEN_SECRET) {
        res.status(500).send('Server Error');
        return;
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err, payload) => {
        
        if (err) {
            res.status(401).send('Unauthorized');
            return;
        }
        req.params.userId = (payload as Payload)._id;
        next();
    });
}
export default  {
    register,
    login,
};

