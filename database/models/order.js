const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    amount           : Number,
    company          : String,
    taxBusinessInfo  : String,
    address          : String,
    city             : String,
    state            : String,
    country          : String,
    zipcode          : String,
    paymentMode      : String,
    status           : String,
    paidVia          : String,
    createdAt        : {type: Date, default: Date.now},
    discountCodeId   : String,
    ticketsPdfUrl    : String,
    //Relationship
    user             : {type: Schema.Types.ObjectId, ref: 'user'},
    event            : {type: Schema.Types.ObjectId, ref: 'event'},
    tickets          : [{type: Schema.Types.ObjectId, ref: 'ticket'}]   
})

const order = mongoose.model('order', orderSchema);
module.exports = order;