const {
  insertVoterService,
  getAllVotersService,
  getVoterService,
  deleteVoterService,
} = require("../services/voters.service");
const { insertVoterSchema } = require("../utils/validators/voter.validator");

const insertVoterController = async (req, res) => {
  try {
    const result = await insertVoterService(req.body);
    res.status(201).json({ message: result.message });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const getAllVotersController = async (req, res) => {
  try {
    const result = await getAllVotersService();
    res.status(200).json({ message: result.message, data: result.data });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const getVoterController = async (req, res) => {
  try {
    const id = req.query.id;
    const result = await getVoterService(id);
    res.status(200).json({ message: result.message, data: result.data });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const deleteVoterController = async (req, res) => {
  try {
    const id = req.query.id;
    console.log(id);
    const result = await deleteVoterService(id);
    res.status(200).json({ message: result.message });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

module.exports = {
  insertVoterController,
  getAllVotersController,
  getVoterController,
  deleteVoterController,
};
