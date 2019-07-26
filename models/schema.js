const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 3
    },

    email: {
        type: String,
        required: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    },
});

let User = mongoose.model('User', userSchema);

module.exports = User;