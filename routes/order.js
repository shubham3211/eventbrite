const route = require('express').Router();
const order = require('../database/models/order');
const event = require('../database/models/event');
const user = require('../database/models/user');
const ticket = require('../database/models/ticket');
const dbApi = require('../database/dbApi');
const orderDbFunction = new dbApi(order);

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
    orderDbFunction.getAllData()
        .then((data) => res.send(data))
        .catch((e) => console.log('error :', e));
})

route.post('/', async (req, res) => {
    const userId = req.body.user;
    const eventId = req.body.event;
    const ticketIds = req.body.tickets;
    orderDbFunction.addCollections(req.body)
        .then(async (data) => {
            await updateInOtherCollection(userId, user, data._id, 'orders');
            await updateInOtherCollection(eventId, event, data._id, 'orders');
            await updateInOtherCollection(ticketIds, ticket, data._id, 'orders');
            res.send(data);
        })
        .catch((e) => console.log('error :', e))
})

route.get('/:_id', (req, res) => {
    orderDbFunction.getSpecificData(req.params)
        .then((data) => res.send(data))
        .catch((e) => console.log('error :', e))
})

route.get('/user/:_id', (req, res) => {
    orderDbFunction.getOneLevelRelationalData(req.params, 'user')
        .then((data) => res.send(data[0].user))
        .catch((e) => console.log('error :', e))
})

route.get('/event/:_id', (req, res) => {
    orderDbFunction.getOneLevelRelationalData(req.params, 'event')
        .then((data) => res.send(data[0].event))
        .catch((e) => console.log('error :', e))
})
module.exports = route;
