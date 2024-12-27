import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import express, { Express } from 'express';
import postRoutes from './routes/postRoutes';
import commentRoutes from './routes/commentRoutes';
import authRoutes from './routes/authRoutes';
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/posts", postRoutes);
app.use("/comments",commentRoutes);
app.use("/auth", authRoutes);

const mongo=mongoose.connection;
mongo.on('error', (error) => console.error(error));
mongo.once('open', () => console.log('Connected to database'));


const initApp = ()=>{
    return new Promise <Express>((resolve, reject) => {
        if(!process.env.db_connect){
            reject('Database connection string is not provided');
        }
        else {
            mongoose.connect(process.env.db_connect)
            .then(() => {
                resolve(app);
            }).catch((err) => {
                reject(err);
            });
        }
    });  
}    
export default initApp;