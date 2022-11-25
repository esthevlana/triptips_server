const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    username: {
      type: String,
      unique: true,
      required: [true, "Name is required."],
    },
    imgUser: {
      type: String,
      default: ''
    },
    favArticles: [{
      type: Schema.Types.ObjectId, ref: "Articles"
    }],
    likedArticles: [{
      type: Schema.Types.ObjectId, ref: "Articles"
    }],
    favTouristPlaces: [{
      type: Schema.Types.ObjectId, ref: "Country"
    }],
    favLodgin: [{
      type: Schema.Types.ObjectId, ref: "Country"
    }],
    favRestaurants: [{
      type: Schema.Types.ObjectId, ref: "Country"
    }]
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
