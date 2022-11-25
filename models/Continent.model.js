const { Schema, model } = require("mongoose");

const continentSchema = new Schema(
  {
    continent: {type: String, unique: true},
    countries: {type: [String], unique: true},
   // allCountries: {type: Schema.Types.ObjectId, ref: "Country"}
  },
  {
    timestamps: true,
  }
);

const Continent = model("Continent", continentSchema);

module.exports = Continent;