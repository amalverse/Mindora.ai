const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mindora.ai API',
      version: '1.0.0',
      description: 'REST API for mental wellness and personal growth platform with AI-powered chat, mood tracking, and journal entries.',
      contact: {
        name: 'Mindora.ai Support',
        url: 'https://mindora.ai',
      },
    },
    // Dynamic server configuration for different hosting platforms
    // Automatically detects the correct API URL based on environment variables
    servers: [
      {
        url: (() => {
          // For Render hosting
          if (process.env.RENDER_EXTERNAL_URL) {
            return `${process.env.RENDER_EXTERNAL_URL}/api`;
          }
          // For Railway hosting
          if (process.env.RAILWAY_STATIC_URL) {
            return `${process.env.RAILWAY_STATIC_URL}/api`;
          }
          // For Heroku hosting
          if (process.env.HEROKU_APP_NAME) {
            return `https://${process.env.HEROKU_APP_NAME}.herokuapp.com/api`;
          }
          // For Vercel hosting (if used for API)
          if (process.env.VERCEL_URL) {
            return `https://${process.env.VERCEL_URL}/api`;
          }
          // For custom API_URL
          if (process.env.API_URL) {
            return process.env.API_URL;
          }
          // For local development
          return 'http://localhost:5000/api';
        })(),
        description: (() => {
          if (process.env.RENDER_EXTERNAL_URL) return 'Render Production Server';
          if (process.env.RAILWAY_STATIC_URL) return 'Railway Production Server';
          if (process.env.HEROKU_APP_NAME) return 'Heroku Production Server';
          if (process.env.VERCEL_URL) return 'Vercel Production Server';
          return process.env.NODE_ENV === 'production' ? 'Production Server' : 'Development Server';
        })(),
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT authentication token (obtained from login)',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '507f1f77bcf86cd799439011',
            },
            name: {
              type: 'string',
              example: 'John Doe',
            },
            email: {
              type: 'string',
              example: 'john@example.com',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Mood: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
            },
            userId: {
              type: 'string',
            },
            mood: {
              type: 'string',
              enum: ['happy', 'sad', 'anxious', 'calm', 'stressed', 'neutral'],
            },
            intensity: {
              type: 'number',
              minimum: 1,
              maximum: 10,
            },
            notes: {
              type: 'string',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Journal: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
            },
            userId: {
              type: 'string',
            },
            title: {
              type: 'string',
            },
            content: {
              type: 'string',
            },
            tags: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
            },
            statusCode: {
              type: 'number',
            },
          },
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            data: {
              type: 'object',
            },
            message: {
              type: 'string',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
