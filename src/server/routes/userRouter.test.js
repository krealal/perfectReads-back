const request = require("supertest");
const path = require("path");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const app = require("../index");
const connectMongo = require("../../db/index");
const User = require("../../db/models/User");

jest.mock("firebase/storage", () => ({
  getStorage: () => ({}),
  ref: () => ({}),
  getDownloadURL: () => Promise.resolve("image.jpg"),
  uploadBytes: () => Promise.resolve(),
}));

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const connectionString = mongoServer.getUri();

  await connectMongo(connectionString);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
  mongoose.disconnect();
});

beforeEach(async () => {
  await User.create({
    name: "kevin",
    username: "kevin",
    password: "$2b$10$KgrIhPGAY12Xy/NPdUdLzubUtsCe0VV42YqPj6mk.sb.8.blGOg7W",
    image: "src/image.jpg",
    about: "i like turtles",
    email: "kevin@kevin.kevin",
  });
});

afterEach(async () => {
  await User.deleteMany({});
});

describe("Given an endpoint POST /user/login", () => {
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

describe("given an endpoint POST /user/register", () => {
  describe("When it receives a username with fields and image", () => {
    test("Then it should return 201 status", async () => {
      await request(app)
        .post(`/user/register`)
        .field("name", "kevin")
        .field("username", "kevin1234")
        .field("password", "kevin1234")
        .field("about", "kevin")
        .field("email", "kevin.kevin")
        .attach("image", path.resolve("public/hola.png"))
        .expect(201);
    });
  });

  describe("When it receives a username with fields and image that alredy exists", () => {
    test("Then it should return 400 status", async () => {
      await request(app)
        .post(`/user/register`)
        .field("name", "kevin")
        .field("username", "kevin")
        .field("password", "kevin1234")
        .field("about", "kevin")
        .field("email", "kevin.kevin")
        .attach("image", path.resolve("public/hola.png"))
        .expect(400);
    });
  });
});
