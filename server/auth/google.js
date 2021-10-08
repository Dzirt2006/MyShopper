const passport = require('passport')
const router = require('express').Router()
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
// const GoogleOauthTokenStrategy = require('passport-token-google').Strategy
const BearerStrategy = require('passport-http-bearer')
const { User } = require('../db/models')
module.exports = router



// const googleConfig = {
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: process.env.GOOGLE_CALLBACK
// }

const secret = require('./secret')
const googleConfig = {
    clientID: secret.google.clientID,
    clientSecret: secret.google.clientSecret,
    callbackURL: secret.google.callbackURL
}


const strategy = new GoogleStrategy(
    googleConfig,
    async (token, refreshToken, profile, done) => {
        const googleId = profile.id
        const email = profile.emails[0].value
        const imgUrl = profile.photos[0].value
        const userName = profile.displayName
        try {
            let [user] = await User.findOrCreate({
                where: { googleId },
                defaults: { email, userName, imgUrl, token }
            })
            if (user.token != token) {
                await User.update({ token: token }, { where: { googleId } })
                user = await User.findOne({ where: { googleId } })
            }
            console.log('in g satrt\n',user)
            done(null, user) // the user we pass to done here is piped through passport.serializeUser
        } catch (err) {
            done(err)
        }
    }
)

const tokenStrategy = new BearerStrategy(
    function (token, done) {
        User.findOne({ where: { token: token } }).then((user,err ) => {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            return done(null, user, { scope: 'all' });
        })
    }
)


passport.serializeUser((user, done) => {
    done(null, user);
});


passport.use(tokenStrategy);

passport.use(strategy)

router.get('/', passport.authenticate('google', { scope: ['email', 'profile'] })
)

router.get('/token', passport.authenticate('bearer', { session: false }),
    function (req, res) {
        res.json(req.user);
    }
);

router.get('/callback',
    passport.authenticate('google', {
        successRedirect: '/home',
        failureRedirect: '/'
    }),
)
router.delete('/logout', (req, res) => {
    // console.log(req.user)
    req.logout()
    req.session.destroy()
})

router.get('/me', (req, res) => {
    res.json(req.user)
})

