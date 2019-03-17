const Rating = require("./models").Rating;
const Wine = require("./models").Wine;

module.exports = {
  getAllRatings(callback) {
    return Rating.findAll()
      .then(ratings => {
        callback(null, ratings);
      })
      .catch(err => {
        callback(err);
      });
  },

  addRating(newRating, callback) {
    return Rating.create(newRating)
      .then(rating => {
        callback(null, rating);
      })
      .catch(err => {
        callback(err);
      });
  },

  getRating(id, callback) {
    return Rating.findById(id)
      .then(rating => {
        callback(null, rating);
      })
      .catch(err => {
        callback(err);
      });
  },

  deleteRating(req, callback) {
    const id = req.params.id;

    return Rating.destroy({
      where: { id }
    })
      .then(deletedRecordsCount => {
        callback(null, deletedRecordsCount);
      })
      .catch(err => {
        callback(err);
      });
  },

  updateRating(id, updatedRating, callback) {
    return Rating.findById(id).then(rating => {
      if (!rating) {
        return callback("Rating not found");
      }
      rating
        .update(updatedRating, {
          fields: Object.keys(updatedRating)
        })
        .then(() => {
          callback(null, rating);
        })
        .catch(err => {
          callback(err);
        });
    });
  }
};
