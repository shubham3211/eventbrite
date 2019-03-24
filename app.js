const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/eventbrite');
mongoose.Promise = global.Promise;
const bodyParser = require('body-parser');
const routes = {
    event   : require('./routes/event'),
    user    : require('./routes/user'),
    order   : require('./routes/order'),
    session : require('./routes/session'),
    speaker : require('./routes/speaker')
}
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/event', routes.event);
app.use('/user', routes.user);
app.use('/order', routes.order);
app.use('/session', routes.session);
app.use('/speaker', routes.speaker);
app.listen(5000 , () => console.log('listening on port 5000'));