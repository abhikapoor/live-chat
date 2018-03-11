// Make connection
var socket = io.connect('https://live-chat-ak.herokuapp.com/');

// Query DOM
var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

// Emit events
btn.addEventListener('click', function() {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
});

btn.addEventListener("keyup", function(event) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Trigger the button element with a click
        socket.emit('chat', {
            message: message.value,
            handle: handle.value
        });
        message.value = "";
    }
});

message.addEventListener('focus', function() {
    socket.emit('typing', handle.value);
});

handle.addEventListener('focus', function() {
    socket.emit('removetyping', handle.value);
});

// Listen for events
socket.on('chat', function(data) {
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data) {
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});

socket.on('removetyping', function(data) {
    feedback.innerHTML = '';
});