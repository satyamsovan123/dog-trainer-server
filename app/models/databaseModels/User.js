const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const mongoosePaginate = require("mongoose-paginate-v2");
const PetProfile = require("./PetProfile");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    petProfile: { type: ObjectId, ref: "PetProfile" },
    lastTopicRead: {
      type: Object,
      required: false,
      default: { courseName: "", topic: "" },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("User", userSchema);
