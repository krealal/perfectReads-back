const { notFoundError } = require("./error");

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
});
