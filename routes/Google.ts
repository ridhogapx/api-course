import { User } from "../models/User/Schema";

// Passport & Strategy
const GoogleStrategy = require('passport-google-oauth2').Strategy();

// Dotenv for accessing API Google
const dotenv = require('dotenv');
dotenv.config();

// Shall continue this
const Google = (passport: any): void => {
    passport.use(new GoogleStrategy({
        clientID: process.env.clientID,
        clientSecret: process.env.clientSecret
    }))
}