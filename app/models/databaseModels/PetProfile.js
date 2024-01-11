const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const mongoosePaginate = require("mongoose-paginate-v2");

const petProfileSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    petName: { type: String, required: false },
    petBreed: { type: String, required: false },
    petGender: { type: String, required: false },
    petDOB: { type: Date, required: false },
    petWeight: { type: [], required: false },
  },
  {
    timestamps: true,
  }
);

petProfileSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("PetProfile", petProfileSchema);
