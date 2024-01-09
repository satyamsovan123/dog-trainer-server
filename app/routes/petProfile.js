const express = require("express");
const router = express.Router();

const { verifyJWT, verifyPetProfileRequest } = require("../middlewares");
const { getPetProfile, updatePetProfile } = require("../controllers");

router.get("/getpetprofile", verifyJWT, getPetProfile);
router.post(
  "/updatepetprofile",
  verifyJWT,
  verifyPetProfileRequest,
  updatePetProfile
);

module.exports = router;
