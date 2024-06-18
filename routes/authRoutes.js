const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/api-docs');
  }
);

router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) {
      console.error(err);
    }
    res.redirect('/');
  });
});

router.get('/login', (req, res) => {
  res.send('Login Page'); // Replace with actual login page rendering if using a templating engine
});

module.exports = router;
