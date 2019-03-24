const route = require('express').Router();
const user = require('../database/models/user');
const dbApi = require('../database/dbApi');
const userDbFunctions = new dbApi(user);

route.get('/', (req, res) => {
    userDbFunctions.getAllData()
        .then((data) => res.send(data))
        .catch((e) => console.log('error :', e));
})

route.post('/', (req, res) => {
    userDbFunctions.addCollections(req.body)
        .then((data) => res.send(data))
        .catch((e) => console.log('error :', e))    
})

route.get('/:_id', (req, res) => {
    userDbFunctions.getSpecificData(req.params)
        .then((data) => res.send(data))
        .catch((e) => console.log('error :', e))
})

route.post('/:_id', (req, res) => {
    userDbFunctions.updateOneRow(req.params, req.body)
        .then((data) => res.send(data))
        .catch((e) => console.log('error :', e))
})

route.get('/events/:_id', (req, res) => {
    userDbFunctions.getOneLevelRelationalData(req.params, 'events')
        .then((data) => res.send(data[0].events))
        .catch((e) => console.log('error :', e))
})

route.get('/sessions/:_id', (req, res) => {
    userDbFunctions.getOneLevelRelationalData(req.params, 'sessions')
        .then((data) => res.send(data[0].sessions))
        .catch((e) => console.log('error :', e))
})

module.exports = route;