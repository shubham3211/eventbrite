const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email                  : String,
    password               : String,
    isSuperAdmin           : Boolean,
    isAdmin                : Boolean,
    isUserOrganizer        : Boolean,
    isUserCoorganizer      : Boolean,
    isUserTrackOrganizer   : Boolean,
    isUserModerator        : Boolean,
    isUserRegistrar        : Boolean,
    isSalesAdmin           : Boolean,
    isMarketer             : Boolean,
    firstName              : String,
    lastName               : String,
    thumbnailImageUrl      : String,
    facebookUrl            : String,
    instagramUrl           : String,
    twitterUrl             : String,
    createdAt              : {type: Date, default: Date.now},
    deletedAt              : Date,
    
    //Relationship
    events                 : [{type: Schema.Types.ObjectId, ref: 'event'}],
    orders                 : [{type: Schema.Types.ObjectId, ref: 'order'}],
    sessions               : [{type: Schema.Types.ObjectId, ref: 'session'}]      
})

const user = mongoose.model('user', userSchema);
module.exports = user;