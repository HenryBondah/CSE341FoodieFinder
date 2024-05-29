const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'CSE341FoodieFinder API',
    description: 'API for Food Recommendation App',
  },
  host: 'localhost:8080',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/userRoutes.js', './routes/foodRoutes.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
