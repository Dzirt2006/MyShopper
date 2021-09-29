const passport = require('passport')
const router = require('express').Router()
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const { User } = require('../db/models')
module.exports = router



const googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
}

// const secret=require ('./secret')
// const googleConfig = {
//     clientID: secret.google.clientID,
//     clientSecret: secret.google.clientSecret,
//     callbackURL: secret.google.callbackURL
// }


const strategy = new GoogleStrategy(
    googleConfig,
    async (token, refreshToken, profile, done) => {
        const googleId = profile.id
        const email = profile.emails[0].value
        const imgUrl = profile.photos[0].value
        const userName = profile.displayName
       console.log('\n\n\n\n\n\n\n\n\n'+token+'\n\n\n\n\n\n\n\n\n')

        try {
            const [user] = await User.findOrCreate({
                where: { googleId },
                defaults: { email, userName, imgUrl }
            })
            done(null, user) // the user we pass to done here is piped through passport.serializeUser
        } catch (err) {
            done(err)
        }
    }
)

passport.use(strategy)

router.get('/', passport.authenticate('google', { scope: ['email', 'profile'] })
)

router.get('/callback',
    passport.authenticate('google', {
        successRedirect: '/home',
        failureRedirect: '/'
    }),
    (req,res)=>{
        console.log('\n\n\n\n\n\n\n\n\n'+req+'\n\n\n\n\n\n\n\n\n')
    }
)
router.delete('/logout', (req, res) => {
    req.logout()
    req.session.destroy()
})

router.get('/me', (req, res) => {
    res.json(req.user)
})

