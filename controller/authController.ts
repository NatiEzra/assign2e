
import userModel, { interUser } from "../model/user";
import { Request, Response } from "express";
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
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRES });
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
    console.log('here');
    console.log(userExists);
    if(!userExists){
        console.log("User does not exist");
        console.log(email);
        res.status(400).send("Username or pasword is incorrect");
        return;
    }
    else{
        const validPassword= await bcrypt.compare(password,userExists.password);
        console.log(validPassword);
        console.log('here2')
        if(!validPassword){
            console.log("Password is incorrect");
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

export default  {
    register,
    login
};

