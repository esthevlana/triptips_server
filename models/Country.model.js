const { Schema, model } = require("mongoose");

const countrySchema = new Schema(
  {
    name: [{
        type: Schema.Types.ObjectId, ref: "Article"
    }],
    continent: {
        type: Schema.Types.ObjectId, ref: "Continent"
    },
    countryImg: {
        type: Schema.Types.ObjectId, ref: "Continent"
    },
    articles: {
      type: Schema.Types.ObjectId, ref: "Article"
    }
  },
  {
    timestamps: true,
  }
);

const Country = model("Country", countrySchema);

module.exports = Country;