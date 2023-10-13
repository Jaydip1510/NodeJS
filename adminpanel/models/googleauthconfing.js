const passport = require('passport')
const mongoose = require('mongoose');

const model = require("./registermodels")
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user , done) => { 
  done(null , user); 
}) 
passport.deserializeUser(function(user, done) { 
  done(null, user); 
}); 
passport.use(new GoogleStrategy({
    clientID:"44781859447-99mkikvutc97sqaivon4mvbe09p9bcrf.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile)
    model.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));