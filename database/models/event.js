const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sponsorSchema = require('../Schema/sponsor');

const eventSchema = new Schema({
    name                            : String,
    description                     : String,
    startsAt                        : Date,
    endsAt                          : Date,
    locationName                    : Date,
    searchableLocationName          : String,
    longitude                       : Number,
    latitude                        : Number,
    logoUrl                         : String,
    thumbnailImageUrl               : String,
    largeImageUrl                   : String,
    originalImageUrl                : String,
    iconImageUrl                    : String,
    isMapShown                      : Boolean,
    isSponsorsEnabled               : Boolean,
    isTicketingEnabled              : Boolean,
    isSessionsSpeakersEnabled       : Boolean,
    isTaxEnabled                    : Boolean,
    canPayByPaypal                  : Boolean,
    canPayByStripe                  : Boolean,
    isStripeLinked                  : Boolean,
    canPayByCheque                  : Boolean,
    canPayByBank                    : Boolean,
    canPayOnsite                    : Boolean,
    paymentCountry                  : String,
    paymentCurrency                 : String,
    paypalEmail                     : String,
    chequeDetails                   : String,
    bankDetails                     : String,
    onsiteDetails                   : String,
    orderExpiryTime                 : Number,
    schedulePublishedOn             : Date,
    hasOrganizerInfo                : Boolean,
    organizerName                   : String,
    organizerDescription            : String,
    externalEventUrl                : String,
    ticketUrl                       : String,
    codeOfConduct                   : String,
    state                           : String,
    privacy                         : String,
    createdAt                       : {type: Date, default: Date.now},
    deletedAt                       : Date,
    
    // Relationship

    type        : String,
    topic       : String,
    sponsors    : [sponsorSchema],
    user        : {type: Schema.Types.ObjectId, ref: 'user'},
    orders      : [{type: Schema.Types.ObjectId, ref: 'order'}],
    sessions    : [{type: Schema.Types.ObjectId, ref: 'session'}],
    speakers    : [{type: Schema.Types.ObjectId, ref: 'speaker'}],
    tickets     : [{type: Schema.Types.ObjectId, ref: 'ticket'}]
})

const event = mongoose.model('event', eventSchema);

module.exports = event;