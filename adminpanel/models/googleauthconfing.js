var GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.use(new GoogleStrategy({
    clientID:"44781859447-99mkikvutc97sqaivon4mvbe09p9bcrf.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));