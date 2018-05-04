const express = require('express')
const app = express()
var SerialPort = require("serialport");
var serialport = new SerialPort("/dev/cu.usbmodem14341");

// const totalVotes = () => a + b
// const percentA = () => (a * 100) / totalVotes()
// let a = 0
// let b = 0

app.post('/', (req, res) => {
    return res.send({
    "label": "Email Address",
    "name": "email",
    "type": "text",
    "subtype": "email",
    "placeholder": "you@example.com"
  })
})
app.get('/a', (req, res) => {
  serialport.write('a', function(err) {
  if (err) {
    return console.log('Error on write: ', err.message);
  }
  console.log('message written');
});
  return res.send('Hello World!')
})

app.get('/b', (req, res) => {
  serialport.write('b', function(err) {
  if (err) {
    return console.log('Error on write: ', err.message);
  }
  console.log('message written');
});
  return res.send('Hello World!')
})

app.get('/r', (req, res) => {
  serialport.write('r', function(err) {
  if (err) {
    return console.log('Error on write: ', err.message);
  }
  console.log('message written');
});
  return res.send('Hello World!')
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
