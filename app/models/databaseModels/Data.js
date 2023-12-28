const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const mongoosePaginate = require("mongoose-paginate-v2");

const dataSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    data: { type: String, required: true },
    email: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

dataSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Data", dataSchema);
