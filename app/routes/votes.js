var express = require("express");
const { insertVoteController,
    getAllVotesController,
    getStatisticsController
 } = require("../controllers/vote.controller");

var router = express.Router();

router.post("/", insertVoteController);
router.get("/getVotes", getAllVotesController);
router.get("/getStatistics", getStatisticsController);

module.exports = router;
