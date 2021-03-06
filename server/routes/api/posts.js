const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Gets all data (used for match display)
router.get('/', async(req, res) => {
    const posts = await loadMatches();
    res.send(await posts.find({}).toArray());
});

router.get('/register', async(req, res) => {
    const posts = await loadMatches();
    res.send(await posts.find({}).toArray());
});

//Gets one piece of data based off of its id (used for playback)
router.get('/:id', async(req, res) => {
    const posts = await loadMatches()
    res.send(await posts.findOne({ _id: new mongodb.ObjectID(req.params.id) }))
})


router.post('/register', async(req, res) => {
    const posts = await loadMatches();
    await posts.insertOne({
        name: req.body.name,
        password: req.body.password,
        createdAt: new Date()
    })
    res.status(201).send();
})


//Inserts a new match (used for scout)
router.post('/', async(req, res) => {
    const posts = await loadMatches();
    const id = new mongodb.ObjectID()
    const result = await posts.insertOne({
        matchNumber: req.body.matchNumber,
        teamNumber: req.body.teamNumber,
        flipped: req.body.flipped,
        events: req.body.events,
        climb: req.body.climb,
        defense: req.body.defense,
        comments: req.body.comments,
        scoutName: req.body.scoutName,
        win: req.body.win,
        team: req.body.team,
        rocket: req.body.rocket,
        colour: req.body.colour,
        createdAt: new Date(),
        _id: id
    })
    res.status(201).send('' + id);
})

//Loads all data in database collection
async function loadMatches() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://user:user@cluster.aebgh.mongodb.net/scouting-app?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });

    return client.db('scouting-app').collection('collection');
}

module.exports = router;