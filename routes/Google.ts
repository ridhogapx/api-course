// Session
const session = require("express-session");

// Passport & Strategy
const GoogleStrategy = require('passport-google-oauth2').Strategy

// Dotenv for accessing API Google
const dotenv = require('dotenv')
dotenv.config();

// Session options
session({ resave: false, saveUninitialized: true, secret: process.env.SECRET})

// Shall continue this
const Google = (passport: any): void => {
    passport.use(new GoogleStrategy({
        clientID: process.env.clientID,
        clientSecret: process.env.clientSecret,
        callbackURL: 'http://sus.penguincadel.my.id/auth/google/callback',
        passReqToCallback: true
    }, async(request: any, accessToken: any, refreshToken: any, profile: any, done: any): Promise<any>  => {
        const user = {
            email: profile.emails[0].value,
            displayName: profile.displayName
        }

        return done(null, user);
    }, passport.serializeUser((user: any, done: any): void => {
        done(null, user)
    }), passport.deserializeUser((user: any, done: any): void => {
        done(null, user)
    }) 
    
    ))
}

export default Google