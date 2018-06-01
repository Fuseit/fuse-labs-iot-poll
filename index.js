const express = require('express')
var request = require('request-promise');
var bodyParser = require('body-parser')

var {mongoose} = require('./db/mongoose');
var {Poll} = require('./models/poll')

const port = process.env.PORT || 3002;
const app = express()

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

app.get('/', (req, res) => {
  res.send({ a, b })
})

app.post('/', (req, res) => {
    const result = JSON.parse(req.body.payload).actions[0].value
    if(result === 'a') a++
    if(result === 'b') b++
})

app.get('/create_poll', (req, res) => {
    // send a header
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

app.listen(port, () => console.log(`Example app listening on port ${port}`))
