import { Express } from "express";
import mongoose from "mongoose";
import request from "supertest";
import commentsModel from "../model/comment";
import initApp from "../server";
//import testComments from "./test_comments.json";

var app: Express;

beforeAll(async () => {
  console.log("beforeAll");
  app = await initApp();
  await commentsModel.deleteMany();
});

afterAll((done) => {
  console.log("afterAll");
  mongoose.connection.close();
  done();
});

let commentId = "";

describe("Comments Tests", () => {
  test("Comments test get all", async () => {
    const response = await request(app).get("/comments");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(0);
  });

  test("Test Create Comment", async () => {
    const response = await request(app).post("/comments").send({
      postId: "Test PostId-1",
      content: "Test Content-1",
      username: "Test username-1",
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.postId).toBe("Test PostId-1");
    expect(response.body.content).toBe("Test Content-1");
    expect(response.body.username).toBe("Test username-1");
    commentId = response.body._id;
  });


  test("Test Update Comment", async () => {
    const response = await request(app).put("/comments/"+commentId).send({
      postId: "Test PostId",
      content: "Test Content",
      username: "Test username",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.postId).toBe("Test PostId");
    expect(response.body.content).toBe("Test Content");
    expect(response.body.username).toBe("Test username");
    commentId = response.body._id;
  });

  test("Test get comment by username", async () => {
    const response = await request(app).get("/comments?owner=" + "Test username");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].postId).toBe("Test PostId");
    expect(response.body[0].content).toBe("Test Content");
    expect(response.body[0].username).toBe("Test username");
  });

  test("Comments get post by id", async () => {
    const response = await request(app).get("/comments/" + commentId);
    expect(response.statusCode).toBe(200);
    expect(response.body.postId).toBe("Test PostId");
    expect(response.body.content).toBe("Test Content");
    expect(response.body.username).toBe("Test username");
  });


  test("Comments get by post id", async () => {
    const response = await request(app).get("/comments?postId=Test PostId");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].postId).toBe("Test PostId");
    expect(response.body[0].content).toBe("Test Content");
    expect(response.body[0].username).toBe("Test username");
  });

  test("Comments delete by id", async () => {
    const response = await request(app).delete("/comments/" + commentId);
    expect(response.statusCode).toBe(200);
    expect(response.body.postId).toBe("Test PostId");
    expect(response.body.content).toBe("Test Content");
    expect(response.body.username).toBe("Test username");
  });

  test("Comments update fail", async () => {
    const response = await request(app).put("/comments/"+commentId).send({
      postId: "Test PostId",
      content: "Test Content",
      username: "Test username",
    });
    expect(response.statusCode).not.toBe(200);
  });
  
});