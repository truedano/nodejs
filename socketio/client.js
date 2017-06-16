var socket = require('socket.io-client')('http://localhost:3000');
var filename = require('path').basename(__filename);

socket.on('connect', function(){
    console.log(filename,'connect');
    //socket.emit('chat message', filename+':emit');
});

socket.emit('chat message', filename+':emit');
