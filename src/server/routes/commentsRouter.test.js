const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const app = require("../index");
const connectRoboMongo = require("../../db/index");
const Comment = require("../../db/models/Comment");

let mongoServer;
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const connectionString = mongoServer.getUri();
  await connectRoboMongo(connectionString);
});

beforeEach(async () => {
  Comment.create({ name: "luis", image: "luis", score: 1, review: "luis" });
});

afterEach(async () => {
  await Comment.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Given a enpoint /reviews/all", () => {
  describe("When it gets a good endpoint and status 200", () => {
    test("then it should find luis in the body.name", async () => {
      const { body } = await await request(app).get("/reviews/all").expect(200);

      expect(body[0].name).toBe("luis");
    });
  });
});
