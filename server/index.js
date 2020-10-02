const io = require('socket.io')(3000);

const getClientRoom = () => {
    let index = 0;
    while (true) {
      if(!io.sockets.adapter.rooms[index] || io.sockets.adapter.rooms[index].length < 2) {
        return index;
      }
      index ++;
    }
}

io.on('connect', socket => {
    const clientRoom = getClientRoom();

    socket.join(clientRoom);

    if(io.sockets.adapter.rooms[clientRoom].length < 2) {
        io.in(clientRoom).emit('statusRoom', 'Waiting for a stranger ...');
    } else {
        io.in(clientRoom).emit('statusRoom', 'Strangers have entered the room');
    }

    socket.on('sendMessage', function (message) {
      socket.to(clientRoom).emit('receiveMessage', message);
    })

    socket.on('disconnect', (reason) => {
      socket.to(clientRoom).emit('statusRoom', 'The stranger has escaped. Waiting for the next one ....');
    });
});
