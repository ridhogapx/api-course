import { GoogleSchema } from '../models/Google/Schema'
import generateToken from '../middlewares/Token/TokenGenerator'

// Passport & Strategy
const GoogleStrategy = require('passport-google-oauth2').Strategy

// Dotenv for accessing API Google
const dotenv = require('dotenv')
dotenv.config();

// Shall continue this
const Google = (passport: any): void => {
    passport.use(new GoogleStrategy({
        clientID: process.env.clientID,
        clientSecret: process.env.clientSecret,
        callbackURL: 'http://sus.penguincadel.my.id/auth/google/callback',
        passReqToCallback: true
    }, (request: any, accessToken: any, refreshToken: any, profile: any, done: any): any  => {
        return done(null, true);
    }, passport.serializeUser((user: any, done: any): void => {
        done(null, user)
    }), passport.deserializeUser((user: any, done: any): void => {
        done(null, user)
    }) 
    
    ))
}

export default Google