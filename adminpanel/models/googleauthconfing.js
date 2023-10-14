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
    clientID:"19376548750-am2fuuikpptnptv4nfkocpf7lpltc4gk.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL: "http://localhost:8004/auth/google/callback"
  },

  async function (accessToken, refreshToken, profile, cb)  {
  
    await model.findOrCreate({ googleId: profile.id}, function (err, user) {
       return cb(err, user);
    });
  }
));