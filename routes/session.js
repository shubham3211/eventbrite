const route = require('express').Router();
const session = require('../database/models/session');
const event = require('../database/models/event');
const user = require('../database/models/user');
const dbApi = require('../database/dbApi');
const sessionDbFunctions = new dbApi(session);

function updateInOtherCollection(Ids, model, newData, attribute) {
    if(Array.isArray(Ids)){
        model.find({_id: {$in :Ids}})
            .then((allModelData) => {
                allModelData.forEach((modelData) => {
                    modelData[attribute].push(newData);
                    modelData.save();
                })
            })
    }else{
        model.findOne({_id: Ids})
            .then((modelData) => {
                modelData[attribute].push(newData);
                modelData.save();
            })
    }
}

route.get('/', (req, res) => {
    sessionDbFunctions.getAllData()
        .then((data) => res.send(data))
        .catch((e) => console.log('error :', e));
})

route.post('/', async (req, res) => {
    const userId = req.body.user;
    const eventId = req.body.event;

    sessionDbFunctions.addCollections(req.body)
        .then(async (data) => {
            await updateInOtherCollection(userId, user, data._id, 'sessions');
            await updateInOtherCollection(eventId, event, data._id, 'sessions');
            res.send(data);
        })
        .catch((e) => console.log('error :', e))    
})

route.get('/:_id', (req, res) => {
    sessionDbFunctions.getSpecificData(req.params)
        .then((data) => res.send(data))
        .catch((e) => console.log('error :', e))
})

route.post('/:_id', (req, res) => {
    sessionDbFunctions.updateOneRow(req.params, req.body)
        .then((data) => res.send(data))
        .catch((e) => console.log('error :', e))
})

route.get('/event/:_id', (req, res) => {
    sessionDbFunctions.getOneLevelRelationalData(req.params, 'event')
        .then((data) => res.send(data[0].event))
        .catch((e) => console.log('error :', e))
})

route.get('/user/:_id', (req, res) => {
    sessionDbFunctions.getOneLevelRelationalData(req.params, 'user')
        .then((data) => res.send(data[0].user))
        .catch((e) => console.log('error :', e))
})

route.get('/speakers/:_id', (req, res) => {
    sessionDbFunctions.getOneLevelRelationalData(req.params, 'speakers')
        .then((data) => res.send(data[0].speakers))
        .catch((e) => console.log('error :', e))
})
module.exports = route;