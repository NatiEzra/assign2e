import request from "supertest";
import initApp from "../server";
import mongoose from "mongoose";
import postModel from "../model/post";
import { Express } from "express";
import { before } from "node:test";

var app : Express;
beforeAll((done) => {
    done();
});


afterAll(async () => {
  await mongoose.connection.close();
});