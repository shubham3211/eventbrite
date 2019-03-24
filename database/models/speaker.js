const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const speakerSchema = new Schema({

  name               : String,
  email              : String,
  photoUrl           : String,
  shortBiography     : String,
  longBiography      : String,
  speakingExperience : String,
  mobile             : String,
  location           : String,
  website            : String,
  twitter            : String,
  facebook           : String,
  github             : String,
  linkedin           : String,
  organisation       : String,
  position           : String,
  country            : String,
  city               : String,
  gender             : String,

  //Relationship

  event    : {type: Schema.Types.ObjectId, ref: 'event'},
  sessions : [{type: Schema.Types.ObjectId, ref: 'session'}]
})

const speaker = mongoose.model('speaker', speakerSchema);
module.exports = speaker;