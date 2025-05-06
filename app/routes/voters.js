var express = require("express");
const {
  insertVoterController,
  getAllVotersController,
  getVoterController,
  deleteVoterController,
} = require("../controllers/voters.controller");
var router = express.Router();

router.post("/insert", insertVoterController);
router.get("/getAll", getAllVotersController);
router.get("/getById", getVoterController);
router.delete("/deleteById", deleteVoterController);

module.exports = router;
