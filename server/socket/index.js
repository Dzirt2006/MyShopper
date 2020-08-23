module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', () => console.log('Connection was lost'))

    socket.on('subscribe', pool => {
      socket.join(pool);
      socket.emit('message', 'what is going on, party people?');
    })

    socket.on('unsubscribe', pool => {
      socket.leave(pool);
    })

    socket.on('product_added', id => {
      io.to(id).emit('product_added');
    });

    socket.on('status_changed', id => {
      io.to(id).emit('status_changed');
    });

    socket.on('disconnect', function () {
      console.log('disconect')
      io.sockets.emit('user disconnected');
    });

  })
}