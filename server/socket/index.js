module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', () => console.log('Connection was lost'))

    socket.on('subscribe',  (room) => {
      console.log('joining pool', room);
      socket.join(room);
      socket.to(room).emit('joined')
    })

  })
}