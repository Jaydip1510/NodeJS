const user = require("../models/userModel");
const LocalStrategy = require("passport-local").Strategy;
const initializingPassport = (passport)=>{
    passport.use(
        new LocalStrategy(async (username, password, done) => {
          let userdata = await user.findOne({ username: username });
          try {
            if (!userdata) return done(null, false);
            if (userdata.password !== password) return done(null, false);
            return done(null, userdata);
          } catch (error) {
            return done(error, false);
          }
        })
      );
    
      passport.serializeUser((user, done) => {
        done(null, user.id);
      });
    
      passport.deserializeUser(async (id, done) => {
        let data = await user.findById(id);
        done(null, data);
      });
}

module.exports = initializingPassport;