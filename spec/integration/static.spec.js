const request = require("request"); // Used to make requests to the server during the tests
const server = require("../../src/server");
const base = "http://localhost:3000/"; // Base URL to be used for the requests

describe("routes : static", () => {
  describe("GET /", () => {
    // Test scope: Landing page (root of the application)

    it("should return status code 200 and have 'UVA' in the body of the response", done => {
      // Passing done as a parameter to the function tells jasmine to wait until it is called
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("UVA");
        done();
      });
    });
  });

  describe("GET /about", () => {
    it("should return status code 200 and have 'About Us' in the body of the response", done => {
      request.get(`${base}about`, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("About Us");
        done();
      });
    });
  });
});
