const express = require('express')
const app = express()
var request = require('request-promise');
var bodyParser = require('body-parser')
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
    // "text": "grubs up :pizza:",
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

app.post('/question', (req, res) => {
  const { question, url } = req.body
  console.log(req.body)

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

app.listen(process.env.PORT || 3000, () => console.log('Example app listening on port 3000!'))
