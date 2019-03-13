const Wine = require("./models").Wine;

const Rating = require("./models").Rating;

module.exports = {
  getAllWines(callback) {
    return Wine.all()
      .then(wines => {
        callback(null, wines);
      })
      .catch(err => {
        callback(err);
      });
  },

  getWine(id, callback) {
    return Wine.findById(id, {
      // include serves to eager load all associated ratings of a give wine object
      include: [
        {
          model: Rating,
          as: "ratings"
        }
      ]
    })
      .then(wine => {
        callback(null, wine);
      })
      .catch(err => {
        callback(err);
      });
  },

  addWine(newWine, callback) {
    return Wine.create({
      name: newWine.name,
      country: newWine.country,
      picture: newWine.picture,
      price: newWine.price,
      variety: newWine.variety,
      alcohol: newWine.alcohol,
      poq: newWine.poq,
      body: newWine.body,
      taste: newWine.taste,
      looks: newWine.looks,
      comments: newWine.comments,
      avgRating: newWine.avgRating
    })
      .then(wine => {
        callback(null, wine);
      })
      .catch(err => {
        callback(err);
      });
  },

  deleteWine(id, callback) {
    return Wine.destroy({
      where: { id }
    })
      .then(wine => {
        callback(null, wine);
      })
      .catch(err => {
        callback(err);
      });
  },

  updateWine(id, updatedWine, callback) {
    return Wine.findById(id).then(wine => {
      if (!wine) {
        return callback("Wine not found.");
      }

      wine
        .update(updatedWine, {
          fields: Object.keys(updatedWine)
        })
        .then(() => {
          callback(null, wine);
        })
        .catch(err => {
          callback(err);
        });
    });
  }
};
