const Comment = require("../../db/models/Comment");

const { listComments } = require("./commentControllers");

const mockComments = jest.spyOn(Comment, "find");

describe("given a listComments controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call method json with expectedReview", async () => {
      const expectedReview = [
        { name: "aleale", image: "src/1", review: "wow", score: 4 },
      ];
      mockComments.mockImplementation(() => Promise.resolve(expectedReview));

      const res = { json: jest.fn() };

      await listComments(null, res, null);

      expect(res.json).toHaveBeenCalledWith(expectedReview);
    });
  });

  describe("When it receives a response", () => {
    test("Then it should call function next with message 'no reviews'", async () => {
      const error = new Error();
      mockComments.mockImplementation(() => Promise.reject(error));
      const expectedErrorMessage = "no reviews";
      const expectedError = new Error(expectedErrorMessage);

      const next = jest.fn();

      await listComments(null, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
