const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/User");
const crypto = require("crypto");

// Local Strategy
passport.use(
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) return done(null, false, { message: "Incorrect email" });
      const match = await user.comparePassword(password);
      if (!match) return done(null, false, { message: "Incorrect password" });
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

// Google OAuth


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/auth/google/callback",

    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.findOne({ email: profile.emails[0].value });
          if (user) {
            user.googleId = profile.id;
            await user.save();
          } else {
            user = await User.create({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString("hex"),
            });
          }
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Facebook OAuth
// passport.use(
//   new FacebookStrategy({
//       clientID: process.env.FACEBOOK_APP_ID,
//       clientSecret: process.env.FACEBOOK_APP_SECRET,
//       callbackURL: "/api/auth/facebook/callback",
//       profileFields: ["id", "displayName", "emails"]
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         let user = await User.findOne({ facebookId: profile.id });
//         if (!user) {
//           user = await User.create({
//             facebookId: profile.id,
//             name: profile.displayName,
//             email: profile.emails[0].value
//           });
//         }
//         done(null, user);
//       } catch (err) {
//         done(err, null);
//       }
//     }
//   )
// );

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

module.exports = passport;
