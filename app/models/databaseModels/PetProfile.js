const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const mongoosePaginate = require("mongoose-paginate-v2");

const petProfileSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    petName: { type: String, required: true },
    petBreed: { type: String, required: true },
    petGender: { type: String, required: true },
    petDOB: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

petProfileSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("PetProfile", petProfileSchema);
