const express = require("express");
const router = express.Router();
const { getDataByTitle, getAllData } = require("../controllers/data/getData");
const { addData } = require("../controllers/data/addData");

const {
  verifyJWT,
  verifyPostDataRequest,
  verifyGetDataByTitleRequest,
} = require("../middlewares");
const { getCourseDetails } = require("../controllers");

router.get("/getalldata", verifyJWT, getAllData);
router.get("/getcoursedetails", verifyJWT, getCourseDetails);

router.post(
  "/getdatabytitle",
  verifyJWT,
  verifyGetDataByTitleRequest,
  getDataByTitle
);
router.post("/addData", verifyJWT, verifyPostDataRequest, addData);

module.exports = router;
