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
      default: 'https://res.cloudinary.com/dymq1r3y9/image/upload/v1669724308/movie-gallery/150fa8800b0a0d5633abc1d1c4db3d87-removebg-preview_xculzv.png'
    },
    favArticles: [{
      type: Schema.Types.ObjectId, ref: "Article"
    }],
    favTouristPlaces: [{
      type: Schema.Types.ObjectId, ref: "Review"
    }],
    favLodgin: [{
      type: Schema.Types.ObjectId, ref: "Review"
    }],
    favRestaurants: [{
      type: Schema.Types.ObjectId, ref: "Review"
    }]
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
