// client (listen and send data to the server)
var socket = io();

// listeners
socket.on('connect', function () {
    console.log('Connected to server on client')
});

socket.on('disconnect', function () {
    console.log('Disconnected from server on client')
});

socket.on('newMessage', function (message) {
    console.log('newMessage', message);
})

// events
socket.emit('createMessage', {
    from: 'AmericoFuse',
    text: 'Hi from the client'
}, function (data) {
    console.log('Got it!! Callback!!', data)
});

