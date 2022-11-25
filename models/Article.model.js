const { Schema, model } = require("mongoose");

const articleSchema = new Schema(
  {
    title: {
      type: String,
    },
    countryName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    continentName: {
      type: Schema.Types.ObjectId,
      ref: "Continent",
      required: true,
    },
    imgCountry: {
      type: String,
    },
    allLikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    allFavs: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    touristPlaces: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    lodgin: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    restaurants: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },

  {
    timestamps: true,
  }
);

const Article = model("Article", articleSchema);

module.exports = Article;
