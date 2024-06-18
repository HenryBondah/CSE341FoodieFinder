const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log('Google strategy called');
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;

          user = new User({
            googleId: profile.id,
            username: email ? email.split('@')[0] : 'user',
            email: email,
          });

          await user.save();
        }

        console.log('User authenticated:', user);
        done(null, user);
      } catch (err) {
        console.error('Error in Google strategy:', err);
        done(err, null);
      }
    }
  )
);
