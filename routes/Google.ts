import { GoogleSchema } from '../models/Google/Schema'
import generateToken from '../middlewares/Token/TokenGenerator'

const bcrypt = require('bcrypt')

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
        callbackURL: 'http://localhost:3001/auth/google/callback',
        passReqToCallback: true
    }, async(request: any, accessToken: any, refreshToken: any, profile: any, done: any): Promise<any> => {
        const checkUser = await GoogleSchema.findAll({
            where: {
                email: profile.emails[0].value
            }
        })

        if(checkUser.length) {

            return done(null, true)
        } else {
            await GoogleSchema.create({
                email: profile.emails[0].value,
                name: profile.displayName
            })
        }
        return done(null, true);
    } 
    
    ))
}

export default Google