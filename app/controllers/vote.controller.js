const {
  insertVoteService,
  getAllVotesService,
  getVoteSatatisticsService,
} = require("../services/vote.service");
const { insertVotesSchema } = require("../utils/validators/votes.validator");
const HTTP_STATUS = require("../utils/enums/httpStatus.enum");

/**
 * @swagger
 * /votes/insert:
 *   post:
 *     summary: Register a new vote
 *     tags: [Votes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vote'
 *     responses:
 *       201:
 *         description: Vote successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Vote'
 *                 message:
 *                   type: string
 *                   example: Vote successfully registered
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
const insertVoteController = async (req, res) => {
  try {
    const { voter_id, candidate_id } = req.body;
    const isDataValid = await insertVotesSchema.validateAsync({
      voter_id,
      candidate_id,
    });
    if (isDataValid) {
      const result = await insertVoteService({voter_id, candidate_id}); 
      res.status(HTTP_STATUS.CREATED).json({
        success: true,
        data: result.voter,
        message: "Vote successfully registered",
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
 * /votes/getAll:
 *   get:
 *     summary: Get all registered votes
 *     tags: [Votes]
 *     responses:
 *       200:
 *         description: List of votes retrieved successfully
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
 *                     $ref: '#/components/schemas/Vote'
 *                 message:
 *                   type: string
 *                   example: Votes retrieved successfully
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
const getAllVotesController = async (req, res) => {
  try {
    const result = await getAllVotesService();
    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: result.data,
      message: "Votes retrieved successfully",
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
 * /votes/statistics:
 *   get:
 *     summary: Get voting statistics
 *     tags: [Votes]
 *     responses:
 *       200:
 *         description: Vote statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     votesPerCandidate:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           candidateId:
 *                             type: string
 *                           candidateName:
 *                             type: string
 *                           votes:
 *                             type: number
 *                     percentagePerCandidate:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           candidateId:
 *                             type: string
 *                           candidateName:
 *                             type: string
 *                           votes:
 *                             type: number
 *                           percentage:
 *                             type: number
 *                 message:
 *                   type: string
 *                   example: Vote statistics retrieved successfully
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
const getStatisticsController = async (req, res) => {
  try {
    const result = await getVoteSatatisticsService();
    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: result.data,
      message: "Vote statistics retrieved successfully",
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
  insertVoteController,
  getAllVotesController,
  getStatisticsController,
};
