const express = require('express');
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
require('dotenv').config();
require('./config/passport');
const connectDB = require('./db/db');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const foodRoutes = require('./routes/foodRoutes');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./graphql/schema');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log('Session:', req.session);
  console.log('User:', req.user);
  next();
});

// Routes
app.use('/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/foods', foodRoutes);

// Middleware to protect routes
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth/login');
};

// Serve Swagger UI
app.use('/api-docs', ensureAuthenticated, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Verify environment variables
console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET);
console.log("SESSION_SECRET:", process.env.SESSION_SECRET);

// Connect to MongoDB and start the server
connectDB().then(async () => {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start(); // Ensure the server is started before applying middleware
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});
