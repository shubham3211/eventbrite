const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sponsorSchame = new Schema({
    name: String,
    level: String,
    type: String,
    url: String,
    description: String,
    logoUrl: String
})

module.exports = sponsorSchame;