module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', () => console.log('Connection was lost'))

    socket.on('subscribe', (pool) => { 
      console.log('joining pool', pool);    
      socket.join(pool);
      socket.emit('message','what is going on, party people?');
    })

    socket.on('message', function(data) {
      io.to(Object.keys(socket.rooms)[0]).emit('message',data);
   });

  })
}