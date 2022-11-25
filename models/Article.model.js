const { Schema, model } = require("mongoose");

const articleSchema = new Schema(
  {
    title: {
      type: String,
    },
    countryName: {
        type: String,
        required: true
    },
    description: {
      type: String,
    },
    continentName: {
        type: Schema.Types.ObjectId, ref: "Continent",
        required: true
    },
    imgCountry: {
    type: String,
    required: true,
    },
    allLikes: [{
        type: Schema.Types.ObjectId, ref: "User"
    }],
    allFavs: [{
        type: Schema.Types.ObjectId, ref: "User"
    }],
    touristPlaces: String,
    lodgin: String,
    restaurants: String
  },
  

  {
    timestamps: true,
  }
);

const Article = model("Article", articleSchema);

module.exports = Article;
