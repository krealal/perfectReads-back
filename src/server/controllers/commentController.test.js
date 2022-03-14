const Comment = require("../../db/models/Comment");

const {
  listComments,
  deleteReview,
  createReview,
  updateReview,
} = require("./commentControllers");

const mockCommentsGet = jest.spyOn(Comment, "find");
const mockCommentsDelete = jest.spyOn(Comment, "findByIdAndDelete");
const mockCommentsUpdate = jest.spyOn(Comment, "findByIdAndUpdate");

describe("given a listComments controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call method json with expectedReview", async () => {
      const expectedReview = [
        { name: "aleale", image: "src/1", review: "wow", score: 4 },
      ];
      mockCommentsGet.mockImplementation(() => Promise.resolve(expectedReview));

      const res = { json: jest.fn() };

      await listComments(null, res, null);

      expect(res.json).toHaveBeenCalledWith(expectedReview);
    });
  });

  describe("When it receives a response", () => {
    test("Then it should call function next with message 'no reviews'", async () => {
      const error = new Error();
      mockCommentsGet.mockImplementation(() => Promise.reject(error));
      const expectedErrorMessage = "no reviews";
      const expectedError = new Error(expectedErrorMessage);

      const next = jest.fn();

      await listComments(null, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given a deleteReview controller", () => {
  describe("When it receives a response with status 200 and object with id 3", () => {
    test("Then it should delete the review with id 3", async () => {
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const id = "3";
      const req = {};
      req.params = { id };
      const status = 200;
      const expectedDeletedReview = { id: "3" };
      const next = jest.fn();
      mockCommentsDelete.mockResolvedValue(expectedDeletedReview);

      await deleteReview(req, res, next);

      expect(res.status).toHaveBeenCalledWith(status);
      expect(res.json).toHaveBeenCalledWith({ id });
    });
  });

  describe("When it receives a response", () => {
    test("Then it should call function next with message 'cant delete review'", async () => {
      const error = new Error();
      mockCommentsGet.mockImplementation(() => Promise.reject(error));
      const expectedErrorMessage = "cant delete review";
      const expectedError = new Error(expectedErrorMessage);

      const next = jest.fn();

      await deleteReview(null, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given a createReview controller", () => {
  describe("When it's called with req with property body with value { review: nice book}", () => {
    test("Then the method res.status and res.json should be called with 200 ", async () => {
      const status = 201;
      const review = { review: "nice book" };
      const newReview = { ...review, id: 3 };
      const req = { body: review };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      Comment.create = jest.fn().mockResolvedValue(newReview);

      await createReview(req, res);

      expect(Comment.create).toHaveBeenCalledWith(review);
      expect(res.status).toHaveBeenCalledWith(status);
      expect(res.json).toHaveBeenCalledWith(newReview);
    });
  });

  describe("When it receives a response", () => {
    test("Then it should call function next with message 'can't create review'", async () => {
      const error = new Error();
      mockCommentsGet.mockImplementation(() => Promise.reject(error));
      const expectedErrorMessage = "can't create review";
      const expectedError = new Error(expectedErrorMessage);

      const next = jest.fn();

      await createReview(null, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given a updateReview component", () => {
  describe("When it gets response with status 201 and id 3", () => {
    test("Then it should update the review with id3", async () => {
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const id = "3";
      const req = {};
      req.params = { id };
      const status = 201;
      const expectedDeletedReview = { id: "3" };
      const next = jest.fn();
      mockCommentsUpdate.mockResolvedValue(expectedDeletedReview);

      await updateReview(req, res, next);

      expect(res.status).toHaveBeenCalledWith(status);
      expect(res.json).toHaveBeenCalledWith({ id });
    });
  });

  describe("When it receives a response", () => {
    test("Then it should call function next with message 'can't update review'", async () => {
      const error = new Error();
      mockCommentsUpdate.mockImplementation(() => Promise.reject(error));
      const expectedErrorMessage = "can't update review";
      const expectedError = new Error(expectedErrorMessage);

      const next = jest.fn();

      await updateReview(null, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
