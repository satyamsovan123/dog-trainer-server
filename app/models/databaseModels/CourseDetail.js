const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const mongoosePaginate = require("mongoose-paginate-v2");

const courseDetailSchema = new mongoose.Schema(
  {
    courseName: { type: String, required: true, unique: true },
    topics: { type: [String] },
  },
  {
    timestamps: true,
  }
);

courseDetailSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("CourseDetail", courseDetailSchema);
