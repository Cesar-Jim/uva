const sequelize = require("../../src/db/models/index").sequelize;
const Wine = require("../../src/db/models").Wine;

const Rating = require("../../src/db/models").Rating;

describe("POST", () => {
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
      })
        .then(wine => {
          this.wine = wine;

          Rating.create({
            poq: 8,
            body: 8,
            taste: 8,
            looks: 8,
            comments:
              "I've tried this wine last week and was very good for the price",
            avgRating: 8,
            wineId: this.wine.id
          }).then(rating => {
            this.rating = rating;
            done();
          });
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
  });

  describe("#create()", () => {
    it("should create a rating object with poq, body, taste, looks, comments, avgRatings and assigned wine", done => {
      Rating.create({
        poq: 5,
        body: 5,
        taste: 5,
        looks: 5,
        comments: "To be honest, this is not a very good wine",
        avgRating: 5,
        wineId: this.wine.id
      })
        .then(rating => {
          expect(rating.poq).toBe(5);
          expect(rating.comments).toBe(
            "To be honest, this is not a very good wine"
          );
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });

    it("should not create a rating with missing or incomplete information", done => {
      Rating.create({
        comments: "This wine only has comments and no other information"
      })
        .then(rating => {
          done();
        })
        .catch(err => {
          expect(err.message).toContain("Rating.poq cannot be null");
          expect(err.message).toContain("Rating.body cannot be null");
          expect(err.message).toContain("Rating.taste cannot be null");
          expect(err.message).toContain("Rating.looks cannot be null");
          done();
        });
    });
  });

  describe("#setWine()", () => {
    it("should associate a wine and a rating together", done => {
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
      }).then(newWine => {
        expect(this.rating.wineId).toBe(this.wine.id);
        this.rating.setWine(newWine).then(rating => {
          expect(rating.wineId).toBe(newWine.id);
          done();
        });
      });
    });
  });

  describe("#getWine()", () => {
    it("should return the associated wine", done => {
      this.rating.getWine().then(associatedWine => {
        expect(associatedWine.name).toBe("Calixa");
        done();
      });
    });
  });
});
