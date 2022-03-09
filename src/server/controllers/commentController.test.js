const Comment = require("../../db/models/Comment");

const { listComments } = require("./commentControllers");

const mockComments = jest.spyOn(Comment, "find");

describe("given a listComments controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call method json", async () => {
      const expectedProjects = [
        { name: "aleale", image: "src/1", review: "wow", score: 4 },
      ];
      mockComments.mockImplementation(() => Promise.resolve(expectedProjects));

      const res = { json: jest.fn() };

      await listComments(null, res, null);

      expect(res.json).toHaveBeenCalledWith(expectedProjects);
    });
  });
});
