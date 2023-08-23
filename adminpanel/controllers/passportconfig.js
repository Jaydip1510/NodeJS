const user = require("../models/registermodels");
const bcrypt = require("bcrypt")
const LocalStrategy = require("passport-local").Strategy;
const initializingPassport = async (passport) => {
  let count = 1;
  printData = (req, res, next) => {
    console.log("\n==============================")
    console.log(`------------>  ${count++}`)

    console.log(`req.body.username -------> ${req.body.username}`)
    console.log(`req.body.password -------> ${req.body.password}`)

    console.log(`\n req.session.passport -------> `)
    console.log(req.session.passport)

    console.log(`\n req.user -------> `)
    console.log(req.user)

    console.log("\n Session and Cookie")
    console.log(`req.session.id -------> ${req.session.id}`)
    console.log(`req.session.cookie -------> `)
    console.log(req.session.cookie)

    console.log("===========================================\n")

    next()
  }
  passport.use(
    new LocalStrategy({ usernameField: 'email',passwordField:'password' }, async (username, password, done) => {
      let userdata = await user.findOne({ email: username });
      console.log(userdata);
      try {
        if (!userdata) return await done(null, false);
        const isPasswordValid = await bcrypt.compare(password, userdata.password);

        if (!isPasswordValid) {
          return done(null, false, { message: "Incorrect password." });
        }

        return await done(null, userdata);
      } catch (error) {
        return await done(error, false);
      }
    })
  );

  passport.serializeUser(async (user, done) => {
    console.log(`--------> Serialize User`)
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    console.log(`--------> Deserialize User`)
    let data = await user.findById(id);
    done(null, data);
  });
  //passport.use(printData);

}

module.exports = initializingPassport;