const { facebookAppID, facebookAppSecret, facebookAppCallback } = require("../../src/config/vars");
const User = require('../../src/models/users.model');
const FacebookStrategy = require('passport-facebook').Strategy;
module.exports = (passport) => {
    passport.use(new FacebookStrategy({
        clientID: facebookAppID,
        clientSecret: facebookAppSecret,
        callbackURL: facebookAppCallback,
        profileFields: ['id', 'displayName', 'photos', 'email']
    },
        (accessToken, refreshToken, profile, done) => {
          

            createOrUpdateProfile(profile._json.id, profile._json.name  ,profile.name.givenName, profile.name.familyName, profile.emails[0].value, profile.photos[0].value, accessToken, profile.provider)
            .then(user => {
                return done(null, user)
            })
            .catch(err => {
                return done(null, false, { message: 'User alreardy exist' })
            })
        })
    );
    async function createOrUpdateProfile(id, displayName = null, firstName, lastName, email, imageUrl,  accessToken, refreshToken, provider) {
        return User.findOne({ profileId: id })
        .exec()
            .then(async (user) => {
                var firstname
                var lastname
                var username
                if (displayName != null) {
                    var data = displayName.split(" ");
                    firstname = data[0];
                    lastname = data[1];
                } else {
                    firstname = firstName;
                    lastname = lastName;
                    username = firstName

                }

                if (!user) {
                    user = await new User({
                        email,
                        profileId: id,
                        fileName: imageUrl,
                        isEmailVerified: true,
                        password: email + firstname,
                        firstName: firstname || 'NA',
                        lastName: lastname || 'NA',
                        username: firstname,
                    }).save();
                }


                    user.socialAccessToken = accessToken;
                    user.socialRefreshToken = refreshToken;


                return await user.save();
            }).catch(err => {
            
            })
    }

}
