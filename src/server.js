const express = require('express');
const bodyParser = require('body-parser');
const {foodModel} = require('./models/mfb');
const {userModel} = require('./models/users')
const db = require('./config/db.js');

const app = express();

app.use(bodyParser.json());

app.use('/', express.static(__dirname + "/frontend"));

var port = process.env.PORT || 8080;

app.listen( port, (err) => {
    if (err)
 {
     throw err;
 }});

console.log( "Server running on port " + port);

app.post('/app/v1/food', (req,res) => {
        var added = foodModel.create({
            title: req.body.title,
            restaurant: req.body.restaurant,
            photoUrl: req.body.photoUrl,
            goal: req.body.goal,
            currentVotes: 0,
        }, (err, added) => {
            if(err) {
                res.status(400).send(err);
            }
            else {
                res.send(`Success! ${added}`);
            }
        });
});

app.post('/app/v1/vote', async (req,res) => {
    let usr = await userModel.findOne( {name: req.body.user});

    if(usr.add(req.body.title))
    {
        let food = await foodModel.findOne( {title: req.body.title });
        if (!food) {
            res.status(400).send("Error: Food item does not exist!");
        }
        if (!food.upvote()) {
            res.status(400).send("Error: Has already reached limit");
        }
        else {
            res.send("Success! Vote complete");
        }
    };
});

app.get('/app/v1/food/:title', async (req,res) => {
    let food = await foodModel.findOne({ title: req.params.title });
    if (!food) {
        res.status("400").send("Error! Food does not exist!");
    }
    else {
        res.send(food);
    }
});