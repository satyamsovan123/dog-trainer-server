const express = require("express");
const router = express.Router();
const { signUp } = require("../controllers/authentication/signUp");
const {
  authentication,
} = require("../controllers/authentication/authentication");
const { verifyAuthenticationDataRequest } = require("../middlewares");

router.post("/signup", verifyAuthenticationDataRequest, signUp);
router.post("/authentication", verifyAuthenticationDataRequest, authentication);

module.exports = router;
