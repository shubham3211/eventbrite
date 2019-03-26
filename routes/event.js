const route = require('express').Router();
const event = require('../database/models/event');
const user = require('../database/models/user');
const dbApi = require('../database/dbApi');
const eventDbFunctions = new dbApi(event);

route.get('/', (req, res) => {
    eventDbFunctions.getAllData()
        .then((data) => res.send(data))
        .catch((e) => console.log('error :', e));
})

route.post('/', async (req, res) => {
    let currentUser = {};

    await user.findOne({
        email: req.body.email
    })
    .then((data) => currentUser = data)

    delete req.body.email;

    req.body.user = currentUser._id;

    eventDbFunctions.addCollections(req.body)
        .then((data) => {
            currentUser.events.push(data._id);
            currentUser.save()
                .then((userData) => res.send({userData,data}));
        })
        .catch((e) => console.log('error :', e))    
})

route.get('/:_id', (req, res) => {
    eventDbFunctions.getSpecificData(req.params)
        .then((data) => res.send(data))
        .catch((e) => console.log('error :', e))
})

route.post('/:_id', (req, res) => {
    eventDbFunctions.updateOneRow(req.params, req.body)
        .then((data) => res.send(data))
        .catch((e) => console.log('error :', e))
})

route.get('/user/:_id', (req, res) => {
    eventDbFunctions.getOneLevelRelationalData(req.params, 'user')
        .then((data) => res.send(data[0].user))
        .catch((e) => console.log('error :', e))
})

route.get('/sessions/:_id', (req, res) => {
    eventDbFunctions.getOneLevelRelationalData(req.params, 'sessions')
        .then((data) => res.send(data[0].sessions))
        .catch((e) => console.log('error :', e))
})

route.get('/orders/:_id', (req, res) => {
    eventDbFunctions.getOneLevelRelationalData(req.params, 'orders')
        .then((data) => res.send(data[0].orders))
        .catch((e) => console.log('error :', e))
})

route.get('/speakers/:_id', (req, res) => {
    eventDbFunctions.getOneLevelRelationalData(req.params, 'speakers')
        .then((data) => res.send(data[0].speakers))
        .catch((e) => console.log('error :', e))
})

route.get('/tickets/:_id', (req, res) => {
    eventDbFunctions.getOneLevelRelationalData(req.params, 'tickets')
        .then((data) => res.send(data[0].tickets))
        .catch((e) => console.log('error :', e))
})
module.exports = route;