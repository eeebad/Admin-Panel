const {
  googleClientID,
  googleClientSecret,
  googleClientCalback,
} = require("../../src/config/vars");
const User = require('../../src/models/users.model');
const GoogleStrategy = require("passport-google-oauth2").Strategy;
module.exports = (passport) => {
  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: googleClientID,
        clientSecret: googleClientSecret,
        callbackURL: googleClientCalback,
        passReqToCallback: true,
      },
      (request, accessToken, refreshToken, profile, done) => {
        createOrUpdateProfile(
          profile.id,
          null,
          profile.name.givenName,
          profile.name.familyName,
          profile.email,
          profile.picture,
          accessToken,
          refreshToken
        )
          .then((user) => {
            // const accessToken = user.token()
            // user = {accessToken  , ...user }
            return done(null, user);
          })
          .catch((err) => {
            return done(null, false, { message: "User alreardy exist" });
          });
      }
    )
  );
  async function createOrUpdateProfile(
    id,
    displayName = null,
    firstName,
    lastName,
    email,
    imageUrl,
    accessToken,
    refreshToken,
    provider
  ) {
    return User.findOne({ profileId: id })
      .exec()
      .then(async (user) => {
        var firstname;
        var lastname;
        var username;
        if (displayName != null) {
          var data = displayName.split(" ");
          firstname = data[0];
          lastname = data[1];
        } else {
          firstname = firstName;
          lastname = lastName;
          username = firstName;
        }

        if (!user) {
          user = await new User({
            email,
            profileId: id,
            fileName: imageUrl,
            isEmailVerified: true,
            password: email + firstname,
            firstName: firstname || "NA",
            lastName: lastname || "NA",
            username: firstname,
          }).save();
        }

        user.socialAccessToken = accessToken;
        user.socialRefreshToken = refreshToken;

        return await user.save();
      })
      .catch((err) => {});
  }
};
