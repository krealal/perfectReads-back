const { notFoundError, fatalError } = require("./error");

describe("Given a notFoundError function", () => {
  describe("When it receives a response", () => {
    test("Then it should call json with error", () => {
      const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
      };

      const mockedRes = mockResponse();
      notFoundError(null, mockedRes);

      expect(mockedRes.json).toHaveBeenCalled();
    });
  });
  describe("When it receives an error without code nor message", () => {
    test("Then it should call method json with and show error /Unknown error/", () => {
      const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
      };

      const error = {};

      const mockedRes = mockResponse();
      fatalError(error, null, mockedRes, null);

      expect(mockedRes.json).toHaveBeenCalled();
    });
  });
  describe("When it receives an error without status and a response", () => {
    test("Then it should call method json with fatal error ", () => {
      const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
      };

      const error = {
        message: "error",
        code: null,
      };

      const mockedRes = mockResponse();
      fatalError(error, null, mockedRes, null);

      expect(mockedRes.json).toHaveBeenCalled();
    });
  });

  describe("When it receives an error without code nor message", () => {
    test("Then it should call method json with and show error /Unknown error/", () => {
      const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
      };

      const error = {};

      const mockedRes = mockResponse();
      fatalError(error, null, mockedRes, null);

      expect(mockedRes.json).toHaveBeenCalled();
    });
  });
});
