
import userModel, { interUser } from "../model/user";
import { Request, Response } from "express";


const register = async (req: Request, res: Response) => {
    const user: interUser = req.body;
    try {
        const savedUser = await userModel.create(user);
        res.status(200).send(savedUser);
    } catch (error) {
        res.status(400).send(error);
    }
}

export default  {
    register
};

