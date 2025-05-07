const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Voting System API',
      version: '1.0.0',
      description: 'API documentation for the Voting System',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            error: {
              type: 'object',
              properties: {
                code: {
                  type: 'number',
                  example: 400
                },
                message: {
                  type: 'string',
                  example: 'Invalid input data'
                }
              }
            }
          }
        },
        Voter: {
          type: 'object',
          required: ['name', 'document'],
          properties: {
            name: {
              type: 'string',
              example: 'John Doe',
              minLength: 3,
              maxLength: 100
            },
            document: {
              type: 'string',
              example: '1234567890',
              pattern: '^[0-9]{10}$'
            }
          }
        },
        Candidate: {
          type: 'object',
          required: ['name', 'party', 'cc'],
          properties: {
            name: {
              type: 'string',
              example: 'Jane Smith',
              minLength: 3,
              maxLength: 100
            },
            party: {
              type: 'string',
              example: 'Party A',
              minLength: 2,
              maxLength: 50
            },
            cc: {
              type: 'string',
              example: '1234567890',
              pattern: '^[0-9]{10}$'
            }
          }
        },
        Vote: {
          type: 'object',
          required: ['voter_id', 'candidate_id'],
          properties: {
            voter_id: {
              type: 'string',
              example: '507f1f77bcf86cd799439011',
              pattern: '^[0-9a-fA-F]{24}$'
            },
            candidate_id: {
              type: 'string',
              example: '507f1f77bcf86cd799439012',
              pattern: '^[0-9a-fA-F]{24}$'
            }
          }
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            data: {
              type: 'object',
              additionalProperties: true
            },
            message: {
              type: 'string',
              example: 'Operation successful'
            }
          }
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ['./app/controllers/*.js'], // Path to the API docs
};

const specs = swaggerJsdoc(options);

module.exports = specs; 