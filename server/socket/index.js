module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    // socket.on('disconnect', () =>socket.rooms={});

    socket.on('subscribe', pool => {
      socket.join(pool);
      socket.emit('message', 'what is going on, party people?');
    })

    socket.on('unsubscribe',async () => {
      const pools=Object.keys(socket.rooms).filter(item => item!=socket.id)
      await pools.forEach(pool => { socket.leave(pool) });
    })

    socket.on('product_added', id => {
      io.to(id).emit('product_added');
    });

    socket.on('status_changed', id => {
      console.log(Object.keys(socket.rooms).filter(item => item!=socket.id))
      io.to(id).emit('status_changed');
    });

    socket.on('disconnect', function () {

      io.sockets.emit('user disconnected');
    });

  })
}