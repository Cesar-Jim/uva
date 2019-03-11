// Overall integration requirements:
const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/wines/";

// Database interaction requirements:
const sequelize = require("../../src/db/models/index").sequelize;
const Wine = require("../../src/db/models").Wine;

describe("routes : wines", () => {
  beforeEach(done => {
    this.wine;
    sequelize.sync({ force: true }).then(res => {
      Wine.create({
        name: "Ensamble",
        country: "Mexico",
        picture: null,
        price: 25.0,
        variety: "Cabernet Sauvignon, Merlot",
        alcohol: 0.136
      })
        .then(wine => {
          // Bind "wine" to the test context
          this.wine = wine;
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
  });

  describe("GET /wines", () => {
    it("should return a status code 200 and all wines", done => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(err).toBe(null);
        expect(body).toContain("Wine");
        expect(body).toContain("Ensamble");
        done();
      });
    });
  });

  describe("GET /wines/new", () => {
    it("should render a new wine critique form", done => {
      request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Wine Critique");
        done();
      });
    });
  });

  describe("POST /wines/create", () => {
    const options = {
      url: `${base}create`,
      form: {
        name: "Ensamble",
        country: "Mexico",
        picture: null,
        price: 25.0,
        variety: "Cabernet Sauvignon, Merlot",
        alcohol: 0.136
      }
    };

    it("should create a new wine and redirect", done => {
      request.post(options, (err, res, body) => {
        Wine.findOne({ where: { name: "Ensamble" } })
          .then(wine => {
            expect(res.statusCode).toBe(303); // status 303: redirect to a new URI, once a HTTP POST has been performed
            expect(wine.name).toBe("Ensamble");
            expect(wine.country).toBe("Mexico");
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
      });
    });
  });

  describe("GET /wines/:id", () => {
    it("should render a view with the selected wine", done => {
      request.get(`${base}${this.wine.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Mexico");
        done();
      });
    });
  });

  describe("POST /wines/:id/destroy", () => {
    it("should delete the wine with the associated ID", done => {
      Wine.all().then(wines => {
        const wineCountBeforeDelete = wines.length;

        expect(wineCountBeforeDelete).toBe(1);
        request.post(`${base}${this.wine.id}/destroy`, (err, res, body) => {
          Wine.all().then(wines => {
            expect(err).toBeNull();
            expect(wines.length).toBe(wineCountBeforeDelete - 1);
            done();
          });
        });
      });
    });
  });

  describe("GET /wines/:id/edit", () => {
    it("should render a view with and edit wine form", done => {
      request.get(`${base}${this.wine.id}/edit`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Edit Wine");
        expect(body).toContain("Mexico");
        done();
      });
    });
  });

  describe("POST /wines/:id/update", () => {
    it("should update the wine information with the given values", done => {
      const options = {
        url: `${base}${this.wine.id}/update`,
        form: {
          name: "Ensamble",
          country: "Mexico",
          picture: null,
          price: 25.0,
          variety: "Cabernet Sauvignon, Merlot",
          alcohol: 0.136
        }
      };

      request.post(options, (err, res, body) => {
        expect(err).toBeNull();
        Wine.findOne({
          where: { id: this.wine.id }
        }).then(wine => {
          expect(wine.name).toBe("Ensamble");
          done();
        });
      });
    });
  });
});
