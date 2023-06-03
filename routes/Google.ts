import { User } from '../models/User/Schema'
import generateToken from '../middlewares/Token/TokenGenerator'
// Passport & Strategy
const GoogleStrategy = require('passport-google-oauth2').Strategy()

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
        const checkUser = await User.findAll({
            where: {
                email: profile.emails[0].value
            }
        })

        // Must return response for token
        if(checkUser.length) {
            const token: string = generateToken(profile.emails[0].value, checkUser[0].role)
            return done(null, true)
        }

        await User.create({
            email: profile.emails[0].value,
            password: '',
            name: profile.dispayName
        })
     
        return done(null, true);
    } 
    
    ))
}

export default Google