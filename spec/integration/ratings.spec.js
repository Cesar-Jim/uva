const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/wines";

const sequelize = require("../../src/db/models/index").sequelize;
const Wine = require("../../src/db/models").Wine;
const Rating = require("../../src/db/models").Rating;

describe("routes : ratings", () => {
  beforeEach(done => {
    this.wine;
    this.rating;

    sequelize.sync({ force: true }).then(res => {
      Wine.create({
        name: "Calixa",
        country: "Mexico",
        price: 12.99,
        variety: "Syrah",
        alcohol: 13.6,
        picture: "test",
        poq: 8,
        body: 8,
        taste: 8,
        looks: 8,
        comments: "This is some good wine from northern Mexico",
        avgRating: 8
      }).then(wine => {
        this.wine = wine;

        Rating.create({
          poq: 10,
          body: 10,
          taste: 10,
          looks: 10,
          comments: "Wow! this wine exceeded my expectations.",
          avgRating: 10,
          wineId: this.wine.id
        })
          .then(rating => {
            this.rating = rating;
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
      });
    });
  });

  describe("GET /wines/:wineId/ratings/new", () => {
    it("should render a new rating form", done => {
      request.get(`${base}/${this.wine.id}/ratings/new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Your Rating");
        done();
      });
    });
  });

  describe("POST /wines/:wineId/ratings/create", () => {
    it("should create a new rating and redirect", done => {
      const options = {
        url: `${base}/${this.wine.id}/ratings/create`,
        form: {
          poq: 5,
          body: 5,
          taste: 5,
          looks: 5,
          comments: "I really didn't like this wine.",
          avgRating: 5
        }
      };
      request.post(options, (err, res, body) => {
        Rating.findOne({
          where: { comments: "I really didn't like this wine." }
        })
          .then(rating => {
            expect(rating).not.toBeNull();
            expect(rating.poq).toBe(5);
            expect(rating.wineId).not.toBeNull();
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
      });
    });
  });

  describe("GET /wines/:wineId/ratings/:id", () => {
    it("should render a view with the selected rating", done => {
      request.get(
        `${base}/${this.wine.id}/ratings/${this.rating.id}`,
        (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("I really didn't like this wine.");
          done();
        }
      );
    });
  });

  describe("POST /wines/:wineId/ratings/:id/destroy", () => {
    it("should delete the rating with the associated ID", done => {
      expect(this.rating.id).toBe(1);
      request.post(
        `${base}/${this.wine.id}/ratings/${this.rating.id}/destroy`,
        (err, res, body) => {
          Rating.findById(1).then(rating => {
            expect(err).toBeNull();
            expect(rating).toBeNull();
            done();
          });
        }
      );
    });
  });

  describe("GET /wines/:wineId/ratings/:id/edit", () => {
    it("should render a view with an edit rating form", done => {
      request.get(
        `${base}/${this.wine.id}/ratings/${this.rating.id}/edit`,
        (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Edit");
          expect(body).toContain("I really didn't like this wine.");
          done();
        }
      );
    });
  });
});
