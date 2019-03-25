const route = require('express').Router();
const speaker = require('../database/models/speaker');
const session = require('../database/models/session');
const event = require('../database/models/event');
const dbApi = require('../database/dbApi');
const speakerDbFunctions = new dbApi(speaker);

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
    speakerDbFunctions.getAllData()
        .then((data) => res.send(data))
        .catch((e) => console.log('error :', e));
})

route.post('/', (req, res) => {
    const sessionIdArray = req.body.sessions;
    const eventId = req.body.event;

    speakerDbFunctions.addCollections(req.body)
        .then(async (data) => {
            await updateInOtherCollection(sessionIdArray, session, data._id, 'speakers');
            await updateInOtherCollection(eventId, event, data._id, 'speakers');
            res.send(data);
        })
        .catch((e) => console.log('error :', e))    
})

route.get('/:_id', (req, res) => {
    speakerDbFunctions.getSpecificData(req.params)
        .then((data) => res.send(data))
        .catch((e) => console.log('error :', e))
})
//NOT WORKING WRITE UPDATE ARRAY FUNCTION
// route.post('/:_id', (req, res) => {
//     speakerDbFunctions.updateOneRow(req.params, req.body)
//         .then((data) => res.send(data))
//         .catch((e) => console.log('error :', e))
// })

route.post('/add/:arrayName/:_id', (req, res) => {
    console.log('req.params :', req.params);
    speakerDbFunctions.addElementToArray({_id: req.params._id}, req.params.arrayName, req.body.elementToAdd)
        .then(data => res.send(data));
})

route.get('/event/:_id', (req, res) => {
    speakerDbFunctions.getOneLevelRelationalData(req.params, 'event')
        .then((data) => res.send(data[0].event))
        .catch((e) => console.log('error :', e))
})

route.get('/sessions/:_id', (req, res) => {
    speakerDbFunctions.getOneLevelRelationalData(req.params, 'sessions')
        .then((data) => res.send(data[0].sessions))
        .catch((e) => console.log('error :', e))
})

module.exports = route;