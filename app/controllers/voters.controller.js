const {
  insertVoterService,
  getAllVotersService,
  getVoterService,
  deleteVoterService,
} = require("../services/voters.service");

const { insertVoterSchema } = require("../utils/validators/voter.validator");

const HTTP_STATUS = require("../utils/enums/httpStatus.enum");

/**
 * @swagger
 * /voters/insert:
 *   post:
 *     summary: Register a new voter
 *     tags: [Voters]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Voter'
 *     responses:
 *       201:
 *         description: Voter successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Voter'
 *                 message:
 *                   type: string
 *                   example: Voter successfully registered
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
const insertVoterController = async (req, res) => {
  try {
    const { name, cc, email } = req.body;
    const isDataValid = await insertVoterSchema.validateAsync({ name, cc, email });
    if (isDataValid) {
      const result = await insertVoterService(req.body);
      res.status(HTTP_STATUS.CREATED).json({
        success: true,
        data: result.data,
        message: "Voter successfully registered",
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
 * /voters/getAll:
 *   get:
 *     summary: Get all registered voters
 *     tags: [Voters]
 *     responses:
 *       200:
 *         description: List of voters retrieved successfully
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
 *                     $ref: '#/components/schemas/Voter'
 *                 message:
 *                   type: string
 *                   example: Voters retrieved successfully
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
const getAllVotersController = async (req, res) => {
  try {
    const result = await getAllVotersService();
    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: result.data,
      message: "Voters retrieved successfully",
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
 * /voters/getById:
 *   get:
 *     summary: Get a voter by ID
 *     tags: [Voters]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Voter ID
 *     responses:
 *       200:
 *         description: Voter retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Voter'
 *                 message:
 *                   type: string
 *                   example: Voter retrieved successfully
 *       404:
 *         description: Voter not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
const getVoterController = async (req, res) => {
  try {
    const id = req.query.id;
    const result = await getVoterService(id);
    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: result.data,
      message: "Voter retrieved successfully",
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
 * /voters/deleteById:
 *   delete:
 *     summary: Delete a voter by ID
 *     tags: [Voters]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Voter ID
 *     responses:
 *       200:
 *         description: Voter successfully deleted
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
 *                   example: Voter successfully deleted
 *       404:
 *         description: Voter not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
const deleteVoterController = async (req, res) => {
  try {
    const id = req.query.id;
    const result = await deleteVoterService(id);
    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: result.data,
      message: "Voter successfully deleted",
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
  insertVoterController,
  getAllVotersController,
  getVoterController,
  deleteVoterController,
};
