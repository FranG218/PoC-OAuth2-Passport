const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth2').Strategy;

const GOOGLE_CLIENT_ID = '305364186472-fo43nrjl9iuk24qerjaiorqv3nqfvl4j.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = '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'

passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/google/callback",
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
  }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});