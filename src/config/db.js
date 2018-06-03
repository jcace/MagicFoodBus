const mongoose = require('mongoose');

const DB_URL = "mongodb://user:pass123@ds241025.mlab.com:41025/mfb";

try {
    mongoose.connect(DB_URL);
} catch(err) {
    mongoose.createConnection(DB_URL);
}

mongoose.connection
    .once('open', () => console.log("Mongoose running"))
    .on('error', e => {
        throw e;
    });