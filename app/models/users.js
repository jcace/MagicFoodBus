const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    votedRestaurants: [String],
}, {collection: "users"});

userSchema.methods = {
    add(title) {
        if(this.votedRestaurants.indexOf(title) > -1) {
            return false;
        } else {
            this.votedRestaurants.push(title);
            return true;
        }
    },
}

var userModel = mongoose.model('User', userSchema);

module.exports = {
    userModel
}