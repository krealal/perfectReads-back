const jwt = require("jsonwebtoken");

const auth = require("./auth");

describe("Given the auth middleware ", () => {
  describe("When it gets a request with empty header", () => {
    test("Then it should call next with 'Token missing' error", () => {
      const req = {
        header: jest.fn(),
      };
      const res = {};
      const next = jest.fn();

      auth(req, res, next);

      const expectedError = new Error("Token missing");

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it gets a request without token", () => {
    test("Then it should call next 'wrong token' error", () => {
      const token = "hola";

      const req = {
        header: jest.fn().mockReturnValue(token),
      };
      const res = {};
      const next = jest.fn();

      auth(req, res, next);

      const expectedError = new Error("wrong token");

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it gets a request with a correct authorization", () => {
    test("Then it should call next", () => {
      const user = "hola";
      jwt.verify = jest.fn().mockResolvedValue(user);

      const req = {
        header: jest.fn().mockReturnValue(user),
      };
      const res = {};
      const next = jest.fn();

      auth(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
