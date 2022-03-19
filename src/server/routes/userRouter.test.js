const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const app = require("../index");
const connectRoboMongo = require("../../db/index");
const User = require("../../db/models/User");

let mongoServer;
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const connectionString = mongoServer.getUri();
  await connectRoboMongo(connectionString);
});

beforeEach(async () => {
  await User.create({
    name: "kevin",
    username: "kevin",
    password: "$2b$10$KgrIhPGAY12Xy/NPdUdLzubUtsCe0VV42YqPj6mk.sb.8.blGOg7W",
    image: "src/image.jpg",
  });
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Given an endpoint POST /user/login", () => {
  describe("When the endpoint is correct", () => {
    test("Then it should return a token and 200 status", async () => {
      const user = {
        username: "kevin",
        password: "user1",
      };

      const { body } = await request(app)
        .post("/user/login")
        .send(user)
        .expect(200);

      expect(body).toHaveProperty("token");
    });
  });

  describe("When the endpoint is correct but request have wrong username", () => {
    test("Then it should return a 401 status", async () => {
      const user = {
        name: "kevin",
        username: "wrongUsername",
        password: "user1",
      };

      await request(app).post("/user/login").send(user).expect(401);
    });
  });

  describe("When the endpoint is correct but request have wrong password", () => {
    test("Then it should return a 401 status", async () => {
      const user = {
        username: "kevin",
        password: "wrongPassword",
      };

      await request(app).post("/user/login").send(user).expect(401);
    });
  });
});
