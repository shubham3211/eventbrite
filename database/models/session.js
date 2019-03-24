const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    title         : String,
    subtitle      : String,

    shortAbstract : String,
    longAbstract  : String,
    language      : String,
    comments      : String,
    state         : String,
    slidesUrl     : String,
    videoUrl      : String,
    audioUrl      : String,

    createdAt      : String,
    deletedAt      : String,
    speakers       : [{type: Schema.Types.ObjectId, ref: 'speaker'}],
    event          : {type: Schema.Types.ObjectId, ref: 'event'},
    user           : {type: Schema.Types.ObjectId, ref: 'user'},

    startAtDate : Date,
    startAtTime : Date,
    endsAtDate  : Date,
    endsAtTime  : Date
})

const session = mongoose.model('session', sessionSchema);
module.exports = session;