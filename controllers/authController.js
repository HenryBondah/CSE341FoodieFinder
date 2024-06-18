const passport = require('passport');
const User = require('../models/User');

exports.googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

exports.googleAuthCallback = passport.authenticate('google', {
  failureRedirect: '/login',
  successRedirect: '/swagger'
});

exports.register = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    user = new User({ email, password });
    await user.save();
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/swagger');
    });
  } catch (err) {
    next(err);
  }
};

exports.logout = (req, res) => {
  req.logout(err => {
    if (err) { return next(err); }
    res.redirect('/');
  });
};
