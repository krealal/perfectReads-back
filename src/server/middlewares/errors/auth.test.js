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
      const authorization = "hola";
      const req = {
        header: jest.fn().mockReturnValue(authorization),
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
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoia2V2aW4iLCJpZCI6IjYyMzRiZDkyMGNiNDhlYmVlZTI2Mjg3ZSIsImlhdCI6MTY0NzcwMDE2NH0.T2ofiX_jAl1Gqs4LekTDca2X8jH-0ioSAe-xTupF4sA";
      const req = {
        header: jest.fn().mockReturnValue(`${token}`),
      };
      const res = {};
      const next = jest.fn();

      auth(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
