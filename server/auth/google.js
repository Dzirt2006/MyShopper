const passport = require('passport')
const router = require('express').Router()
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const { User,Pool } = require('../db/models')
const secrets = require('./secret');
module.exports = router

/**
 * For OAuth keys and other secrets, your Node process will search
 * process.env to find environment variables. On your production server,
 * you will be able to set these environment variables with the appropriate
 * values. In development, a good practice is to keep a separate file with
 * these secrets that you only share with your team - it should NOT be tracked
 * by git! In this case, you may use a file called `secrets.js`, which will
 * set these environment variables like so:
 *
 * process.env.GOOGLE_CLIENT_ID = 'your google client id'
 * process.env.GOOGLE_CLIENT_SECRET = 'your google client secret'
 * process.env.GOOGLE_CALLBACK = '/your/google/callback'
 */

// if (!process.env.clientID || !process.env.clientSecret ) {
//     console.log('Google client ID / secret not found. Skipping Google OAuth.')
// } else {
//     const googleConfig = {
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: process.env.GOOGLE_CALLBACK
//     }
    const googleConfig = {
        clientID: secrets.google.clientID,
        clientSecret: secrets.google.clientSecret,
        callbackURL: secrets.google.callbackURL
    }
   

    const strategy = new GoogleStrategy(
        googleConfig,
        async (token, refreshToken, profile, done) => {
            const googleId = profile.id
            const email = profile.emails[0].value
            const imgUrl = profile.photos[0].value
            const userName = profile.displayName

        try {
            const [user] = await User.findOrCreate({
                where: { googleId },
                defaults: { email, userName,imgUrl  }
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
        })
    )
    router.post('/logout', (req, res) => {
        req.logout()
        req.session.destroy()
        res.redirect('/')
    })

    router.get('/me', (req, res) => {
        res.json(req.user)
    })
// }
