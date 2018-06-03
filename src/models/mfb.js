const mongoose = require ('mongoose');

const foodSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    restaurant: {
        type: String,
        required: true,
    },
    photoUrl: {
        type: String,
        required: true,
    },
    goal: {
        type: Number,
        required: true,
    },
    currentVotes: {
        type: Number,
        default: 0,
    },
}, {collection: "foods"});

foodSchema.methods = {
    upvote() {
        if(this.currentVotes < this.goal) {
            this.currentVotes++;
            return true;
        }
        else {
            return false;
        }
    },
}

var foodModel = mongoose.model('Food', foodSchema);

module.exports = {
    foodModel
}