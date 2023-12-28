const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const {
  statusCodeConstant,
  userActionConstant,
} = require("../../../constants");
const { Data } = require("../../models");
const { checkExistingData } = require("./utils/dataManipulationHelper");
const fs = require("fs");
const path = require("path");

function naturalSort(a, b) {
  const numRegex = /\d+/;
  const numA = parseInt(a.match(numRegex)[0]);
  const numB = parseInt(b.match(numRegex)[0]);
  if (numA === numB) {
    return a.localeCompare(b);
  }
  return numA - numB;
}

const addData = async (req, res) => {
  try {
    const userData = req.body;
    const title = userData.title;

    const existingData = await checkExistingData(title);

    if (existingData !== null) {
      const generatedResponse = responseBuilder(
        {},
        userActionConstant.DATA_ALREADY_PRESENT,
        statusCodeConstant.ALREADY_EXISTS
      );

      return res.status(generatedResponse.code).send(generatedResponse);
    }

    /** ------------- For adding bulk data; Don't judge me I'm lazy! --------------*/

    // const topics = [
    //   "1 Toilet training intorduction",
    //   "2 Introducing the crate",
    //   "3 A new home",
    //   "4 Continue toilet training",
    //   "5 Introduction to handling",
    //   "6 Learning their name",
    //   "7 Different surfaces",
    //   "8 Sit part 1",
    //   "9 Exploring surfaces",
    //   "10 Toys for chewing",
    //   "11 Recall part 1",
    //   "12 Sleep training",
    //   "13 Playing together",
    //   "14 Toys toilet roll tubes",
    //   "15 Play biting",
    //   "16 Jumping up",
    //   "17 Recall part 2",
    //   "18 Meeting new people",
    //   "19 The outside world",
    //   "20 Sit part 2",
    //   "21 Car journeys part 1",
    //   "22 Recall part 3",
    //   "23 Grooming part 1",
    //   "24 Sit part 3",
    //   "25 Retrieve part 1",
    //   "26 Introduction to bathing your pup",
    //   "27 Storm sounds",
    //   "28 Being alone part 1",
    //   "29 Biting and sleep",
    //   "30 Keeping teeth off hands",
    //   "31 Exploring surfaces",
    //   "32 Stealing items",
    //   "33 Play biting",
    //   "34 Mouth eyes ears",
    //   "35 Settle part 1",
    //   "36 Biting redirect to toys",
    //   "37 Sensory exploration inside",
    //   "38 Lead walking part 1",
    //   "39 Firework sounds part 1",
    //   "40 Grooming part 2",
    //   "41 Being alone part 2",
    //   "42 Introducing the collar and harness",
    //   "43 Firework sounds part 2",
    //   "44 The vacuum cleaner",
    //   "45 Meeting a stranger",
    //   "46 Car journeys part 2",
    //   "47 Recall part 4",
    //   "48 Toys muffin tin",
    //   "49 Down part 1",
    //   "50 Introduction to handling",
    //   "51 Retrieve part 2",
    //   "52 Being alone part 3",
    //   "53 The outside world",
    //   "54 Bathing part 1",
    //   "55 Lead walking part 2",
    //   "56 Recall games",
    //   "57 Down part 2",
    //   "58 Follow me part 1",
    //   "59 Recall part 5",
    //   "60 Being alone part 4",
    //   "61 Lead walking part 3",
    //   "62 Sit part 4",
    //   "63 Bathing part 2",
    //   "64 Settle part 2",
    //   "65 Tails",
    //   "66 Vacuum cleaner sounds",
    //   "67 Retrieving toys",
    //   "68 Lead walking part 4",
    //   "69 Down part 3",
    //   "70 Meeting another dog",
    //   "71 Recall part 6",
    //   "72 Toys bottle dispenser",
    //   "73 Sit part 5",
    //   "74 Leave it",
    // ];

    // const fileContents = [];

    // const allData = [];

    // let files = fs.readdirSync(path.join(__dirname, "./utils/pup-starter"));

    // let filteredFiles = files.filter((file) => file !== ".DS_Store");

    // let allFiles = filteredFiles.sort(naturalSort);

    // allFiles.forEach((file, index) => {
    //   const data = fs.readFileSync(
    //     path.join(__dirname, "./utils/pup-starter", file),
    //     "utf8"
    //   );
    //   fileContents.push(data);
    // });

    // topics.forEach((topic, index) => {
    //   const data = new Data({
    //     title: ``,
    //     data: ``,
    //     email: userData.email,
    //   });
    //   data.title = topic;
    //   data.data = fileContents[index];
    //   if (data.data !== undefined || data.data !== null || data.data !== "") {
    //     allData.push(data);
    //   }
    // });

    // allData.forEach(async (data) => {
    //   const newData = await Data.create(
    //     new Data({
    //       title: data.title,
    //       data: data.data,
    //       email: data.email,
    //     })
    //   );
    //   if (!newData) {
    //     const generatedResponse = responseBuilder(
    //       {},
    //       userActionConstant.ADD_DATA_ERROR,
    //       statusCodeConstant.ERROR
    //     );
    //     return res.status(generatedResponse.code).send(generatedResponse);
    //   }
    // });

    /** --------------------------- */

    const newData = await Data.create(
      new Data({
        title: userData.title,
        data: userData.data,
        email: userData.email,
      })
    );
    if (!newData) {
      const generatedResponse = responseBuilder(
        {},
        userActionConstant.ADD_DATA_ERROR,
        statusCodeConstant.ERROR
      );
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    const generatedResponse = responseBuilder(
      newData,
      userActionConstant.ADD_DATA_SUCCESS,
      statusCodeConstant.SUCCESS
    );

    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      userActionConstant.ADD_DATA_ERROR,
      statusCodeConstant.ERROR
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { addData };
