var mongoose = require('mongoose');

var Poll = mongoose.model('Poll', {
    label: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    type: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    subtype: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    placeholder: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

module.exports = {Poll};