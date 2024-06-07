const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'CSE341FoodieFinder API',
    description: 'API for Food Recommendation App',
  },
  // host: 'localhost:8080',
  // schemes: ['http'],
  host: 'cse341foodiefinder.onrender.com',
  schemes: ['https'],
  paths: {
    "/api/users": {
      "post": {
        "description": "Create a new user",
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "required": true,
            "schema": {
              "type": "object",
              "properties": {
                "username": { "example": "john_doe" },
                "location": { "example": "New York" },
                "foodPreferences": { "example": ["Pizza", "Burger"] }
              }
            }
          }
        ],
        "responses": {
          "201": { "description": "Created" },
          "400": { "description": "Bad Request" },
          "500": { "description": "Internal Server Error" }
        }
      },
      "get": {
        "description": "Get all users",
        "responses": {
          "200": { "description": "OK" },
          "500": { "description": "Internal Server Error" }
        }
      }
    },
    "/api/foods": {
      "post": {
        "description": "Create a new food",
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "required": true,
            "schema": {
              "type": "object",
              "properties": {
                "name": { "example": "Pizza" },
                "price": { "example": 10.99 },
                "discount": { "example": 2 },
                "location": { "example": "New York" },
                "category": { "example": "Fast Food" },
                "vendor": { "example": "Pizza Hut" }
              }
            }
          }
        ],
        "responses": {
          "201": { "description": "Created" },
          "400": { "description": "Bad Request" },
          "500": { "description": "Internal Server Error" }
        }
      },
      "get": {
        "description": "Get all foods",
        "responses": {
          "200": { "description": "OK" },
          "500": { "description": "Internal Server Error" }
        }
      }
    }
  }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/userRoutes.js', './routes/foodRoutes.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
