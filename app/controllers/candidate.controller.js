const {
  insertCandidateService,
  getAllCandidatesService,
  getCandidateService,
  deleteCandidateService,
} = require("../services/candidate.service");

const insertCandidateController = async (req, res) => {
  try {
    const result = await insertCandidateService(req.body);
    res.status(201).json({ message: result.message });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const getAllCandidatesController = async (req, res) => {
  try {
    const result = await getAllCandidatesService();
    res.status(200).json({ message: result.message, data: result.candidates });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const getCandidateController = async (req, res) => {
  try {
    const id = req.query.id;
    const result = await getCandidateService(id);
    res.status(200).json({ message: result.message, data: result.data });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const deleteCandidateController = async (req, res) => {
  try {
    const id = req.query.id;
    console.log(id);
    const result = await deleteCandidateService(id);
    res.status(200).json({ message: result.message });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

module.exports = {
  insertCandidateController,
  getAllCandidatesController,
  getCandidateController,
  deleteCandidateController,
};
