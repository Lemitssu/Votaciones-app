const {
  insertCandidateService,
  getAllCandidatesService,
  getCandidateService,
  deleteCandidateService,
} = require("../services/candidate.service");
const { insertCandidateSchema } = require("../utils/validators/candidates.validator");
const HTTP_STATUS = require("../utils/enums/httpStatus.enum");

/**
 * @swagger
 * /candidates/insert:
 *   post:
 *     summary: Register a new candidate
 *     tags: [Candidates]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Candidate'
 *     responses:
 *       201:
 *         description: Candidate successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Candidate'
 *                 message:
 *                   type: string
 *                   example: Candidate successfully registered
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
const insertCandidateController = async (req, res) => {
  try {
    const { name, party, cc } = req.body;
    const isDataValid = await insertCandidateSchema.validateAsync({
      name,
      party,
      cc,
    });
    if (isDataValid) {
    const result = await insertCandidateService(req.body);
    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      data: result.candidate,
      message: "Candidate successfully registered",
      });
    } else {
      throw new Error(isDataValid.error);
    }
  } catch (error) {
    res.status(error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: {
        code: error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR,
        message: error.message,
      },
    });
  }
};

/**
 * @swagger
 * /candidates/getAll:
 *   get:
 *     summary: Get all registered candidates
 *     tags: [Candidates]
 *     responses:
 *       200:
 *         description: List of candidates retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Candidate'
 *                 message:
 *                   type: string
 *                   example: Candidates retrieved successfully
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
const getAllCandidatesController = async (req, res) => {
  try {
    const result = await getAllCandidatesService();
    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: result.candidates,
      message: "Candidates retrieved successfully",
    });
  } catch (error) {
    res.status(error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: {
        code: error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR,
        message: error.message,
      },
    });
  }
};

/**
 * @swagger
 * /candidates/getById:
 *   get:
 *     summary: Get a candidate by ID
 *     tags: [Candidates]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Candidate ID
 *     responses:
 *       200:
 *         description: Candidate retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Candidate'
 *                 message:
 *                   type: string
 *                   example: Candidate retrieved successfully
 *       404:
 *         description: Candidate not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
const getCandidateController = async (req, res) => {
  try {
    const id = req.query.id;
    const result = await getCandidateService(id);
    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: result.data,
      message: "Candidate retrieved successfully",
    });
  } catch (error) {
    res.status(error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: {
        code: error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR,
        message: error.message,
      },
    });
  }
};

/**
 * @swagger
 * /candidates/deleteById:
 *   delete:
 *     summary: Delete a candidate by ID
 *     tags: [Candidates]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Candidate ID
 *     responses:
 *       200:
 *         description: Candidate successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Candidate successfully deleted
 *       404:
 *         description: Candidate not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
const deleteCandidateController = async (req, res) => {
  try {
    const id = req.query.id;
    const result = await deleteCandidateService(id);
    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: result.data,
      message: "Candidate successfully deleted",
    });
  } catch (error) {
    res.status(error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: {
        code: error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR,
        message: error.message,
      },
    });
  }
};

module.exports = {
  insertCandidateController,
  getAllCandidatesController,
  getCandidateController,
  deleteCandidateController,
};
