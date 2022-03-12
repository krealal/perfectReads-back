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
  Comment.create({
    name: "luis",
    image: "luis",
    score: 1,
    review: "luis",
    _id: "622d1071c27b20dcd9384722",
  });

  Comment.create({
    name: "marta",
    image: "marta",
    score: 3,
    review: "marta",
    _id: "622d1071c27b20dcd9384720",
  });
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
      const { body } = await request(app).get("/reviews/all").expect(200);

      expect(body[0].name).toBe("luis");
    });
  });
});

describe("Given a /reviews/:id endpoint", () => {
  describe("When it receives a DELETE request with a review id", () => {
    test("Then it should respond with a 200 status code and have id in body", async () => {
      const idLuis = "622d1071c27b20dcd9384722";
      const { body } = await request(app)
        .delete(`/reviews/${idLuis} `)
        .expect(200);

      // eslint-disable-next-line no-underscore-dangle
      expect(body._id).toBe(idLuis);
    });
  });
});

describe("Given a /reviews/new-post endpoint", () => {
  describe("When it receives a POST request with a review in the body", () => {
    test("Then it sould find the property name in the body of the request", async () => {
      const review = {
        name: "marta",
        image: "marta",
        score: 3,
        review: "marta",
      };

      const { body } = await request(app)
        .post(`/reviews/new-post`)
        .send(review)
        .expect(201);

      expect(body).toHaveProperty("name");
    });
  });
});
