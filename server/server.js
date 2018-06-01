const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
var bodyParser = require('body-parser')

const { generateMessage } = require('./utils/message');
var {mongoose} = require('../db/mongoose');
var {Poll} = require('../models/poll')

const publicPath = path.join(__dirname, '../public');
console.info('publicPath', publicPath);

const port = process.env.PORT || 3004;
console.info('port', port);

var app = express();
app.use(express.static(publicPath));

var server = http.createServer(app);

var io = socketIO(server);
io.on('connection', (socket) => {
    console.log('New user connected in server');

    // emit event from admin to welcome new chat app
    socket.emit('newMessage', generateMessage('Admin', 'Welcome Mate!! To the Chat!!'));

    // broadcast emit event from admin to new users joined
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user Joined!!'));

    // create listener
    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);

        // emit event to multiple connections
        io.emit('newMessage', generateMessage(message.from, message.text));

        callback('This is from the server');

        // broadcast sends an event to everyone expect to this socket
        // socket.broadcast.emit('newMessage', generateMessage(message.from, message.text));
    });

    socket.on('disconnect', () => {
        console.log('New user disconnected from server');
    });
});

app.use(bodyParser.urlencoded({
    extended: true
}));

let a = 0
let b = 0
let last = ''

const createSlackMessage = (question) => ({
    "text": question,
    "attachments": [
        {
            "fallback": "You are unable to vote",
            "callback_id": "yay_nay",
            "color": "#3AA3E3",
            "attachment_type": "default",
            "actions": [
                {
                    "name": "yayornay",
                    "text": ":+1:",
                    "type": "button",
                    "value": "a"
                },
                {
                    "name": "yayornay",
                    "text": ":-1:",
                    "type": "button",
                    "value": "b"
                }
            ]
        }
    ]
})

/* handlers for the urls */
app.get('/send', (req, res) => {
    res.send({ a, b })
})

app.post('/question', (req, res) => {
    const { question, url } = req.body
    // post message to slack
    request
        .post({
            url: url || 'https://hooks.slack.com/services/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',
            form: JSON.stringify(createSlackMessage(question))
        })
        .then(response => {
            a = 0
            b = 0
            res.send('message posted!')
        })
        .catch(err => {
            console.log(err)
            res.status(500).send()
        })
})

app.post('/question/result', (req, res) => {
    const result = JSON.parse(req.body.payload).actions[0].value
    if(result === 'a') a++
    if(result === 'b') b++
})

app.get('/create_poll', (req, res) => {
    res.send({
        "label": "Email Address",
        "name": "email",
        "type": "text",
        "subtype": "email",
        "placeholder": "you@example.com"
    })
});

app.use(bodyParser.json());

app.post('/create_poll', (req, res) => {
    var poll = new Poll({
        label: req.body.label,
        name: req.body.name,
        type: req.body.type,
        subtype: req.body.subtype,
        placeholder: req.body.placeholder
    });

    poll.save().then((doc) => {
        res.send(doc);
    }, (error) => {
        res.status(400).send(error);
    });
});

app.get('/notfound', (req, res) => {
    res.send({
        errorMessage: 'Unable to send request'
    });
})

server.listen(port, () => {
    console.info(`Server is up on ${port}`);
});