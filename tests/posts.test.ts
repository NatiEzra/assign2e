import request from "supertest";
//import initApp from "../src/app";
import mongoose from "mongoose";
import postModel from "../model/post";
import { Express } from "express";

var app: Express;

beforeAll(async () => {
  //app = initApp();
});