const bcrypt = require("bcrypt");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const User = require("../../db/models/User");
const { userLogin } = require("./userController");
const connectMongo = require("../../db");

jest.mock("jsonwebtoken", () => ({
  ...jest.requireActual("jsonwebtoken"),
  sign: jest.fn().mockReturnValue("token"),
}));

let server;
beforeAll(async () => {
  server = await MongoMemoryServer.create();
  const uri = server.getUri();
  connectMongo(uri);
});

beforeEach(async () => {
  const cryptPassword = await bcrypt.hash("1234", 2);
  await User.create({
    name: "kevin",
    username: "kevin",
    password: cryptPassword,
    image: "src/image.jpg",
    email: "kevin@kevin.kevin",
    about: "i like turtles",
  });
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

describe("given a userLogin controller", () => {
  describe("when it receibes a request", () => {
    test("then should responds with token ", async () => {
      jest.setTimeout(5000);
      const res = {
        json: jest.fn(),
      };
      const req = { body: { username: "kevin", password: "1234" } };
      const token = "token";

      await userLogin(req, res);

      expect(res.json).toHaveBeenCalledWith({ token });
    });

    test("Then if the username or the password is wrong it should return an error", async () => {
      const req = { body: { username: "kevin", password: "1235" } };
      const next = jest.fn();
      const error = new Error("wrong username or password");

      await userLogin(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });

    test("Then if the username not found should return an error", async () => {
      const req = { body: { username: "", password: "1234" } };
      const next = jest.fn();
      const error = new Error("wrong username or password");

      await userLogin(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
