var express = require("express");
const {
  insertCandidateController,
  getAllCandidatesController,
  getCandidateController,
  deleteCandidateController,
} = require("../controllers/candidate.controller");

var router = express.Router();

router.post("/insert", insertCandidateController);
router.get("/getAll", getAllCandidatesController);
router.get("/getById", getCandidateController);
router.delete("/deleteById", deleteCandidateController);
module.exports = router;
