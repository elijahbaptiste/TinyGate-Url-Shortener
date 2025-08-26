const mongoose = require('mongoose')
const shortID = require('shortid')


//MongoDB shcema for our short URL table
const shortUrlsSchema = new mongoose.Schema({
    fullURL: {
        type: String,
        unique: true,
        required: true
    },
    shortURL: {
        type: String,
        required: true,
        unique: true,
        default: shortID.generate
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }, 
    createdBy: {
        type: String,
        required: true,
        default: "Guest User"
    }, 
})
const ShortUrls = mongoose.model('ShortUrls', shortUrlsSchema);


//MongoDB shcema for our blacklisted urls table
const BlackListSchema = new mongoose.Schema({
url: {
        type: String,
        unique: true,
        required: true
    } 
})
const BlackList = mongoose.model('BlackList', BlackListSchema);


//MongoDB shcema for user login information 
const UserDatabaseSchema = new mongoose.Schema({
name: {
        type: String,
        required: true
    },
email: {
        type: String,
        unique: true,
        required: true
    },
password: {
        type: String,
        required: true
    }
})
const Users = mongoose.model('Users', UserDatabaseSchema);

module.exports = { ShortUrls, BlackList, Users };