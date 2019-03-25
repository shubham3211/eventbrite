const route = require('express').Router();
const ticket = require('../database/models/ticket');
const event = require('../database/models/event');
const dbApi = require('../database/dbApi');
const ticketDbFunction = dbApi(ticket);

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
    ticketDbFunction.getAllData()
        .then((data) => res.send(data))
        .catch((e) => console.log('error :', e));
})

route.post('/', async (req, res) => {
    const eventId = req.body.event;

    ticketDbFunction.addCollections(req.body)
        .then(async (data) => {
            await updateInOtherCollection(eventId, event, data._id, 'event');
            res.send(data);
        })
        .catch((e) => console.log('error :', e))
})

route.get('/:_id', (req, res) => {
    ticketDbFunction.getSpecificData(req.params)
        .then((data) => res.send(data))
        .catch((e) => console.log('error :', e))
})

route.get('/orders/:_id', (req, res) => {
    ticketDbFunction.getOneLevelRelationalData(req.params, 'orders')
        .then((data) => res.send(data[0].orders))
        .catch((e) => console.log('error :', e))
})

route.get('/event/:_id', (req, res) => {
    ticketDbFunction.getOneLevelRelationalData(req.params, 'event')
        .then((data) => res.send(data[0].event))
        .catch((e) => console.log('error :', e))
})
module.exports = route;
