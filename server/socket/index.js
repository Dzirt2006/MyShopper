module.exports = io => {
    io.on('connection', socket => {
      console.log('I hear you')
      socket.on('disconnect', () => console.log('Connection was lost'))
    })
  }