const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    name                 : String,
    type                 : String,
    price                : Number,
    quantity             : Number,
    description          : String,
    isDescriptionVisible : Boolean,
    isHidden             : Boolean,
    salesStartsAt        : Date,
    salesEndsAt          : Date,
    minOrder             : Number,
    maxOrder             : Number,
    isFeeAbsorbed        : Boolean,
    position             : Number,
    salesStartAtDate     : Date,
    salesStartAtTime     : Date,
    salesEndsAtDate      : Date,
    salesEndsAtTime      : Date,
    
    //Relationship

    event           : {type: Schema.Types.ObjectId, ref: 'event'},
    orders          : [{type: Schema.Types.ObjectId, ref: 'order'}]
})

const ticket = mongoose.model('ticket', ticketSchema);
module.exports = ticket;