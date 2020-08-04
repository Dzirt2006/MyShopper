// const app = require('./server')
// const db = require('./server/db')
// const PORT = process.env.PORT || 8000;




// const http = require('http')
// const server = http.createServer(app)
// const socketIO = require('socket.io')

// // This creates our socket using the instance of the server
// const io = socketIO(server)

// // This is what the socket.io syntax is like, we will work this later
// io.on('connection', socket => {
//   console.log('User connected')
//   socket.on('disconnect', () => {
//     console.log('user disconnected')
//   })
// })


// db.sync().then(() => {
//     console.log('db synced');
//     server.listen(PORT, () =>
//         console.log(`studiously serving silly sounds on port http://localhost:${PORT}`)
//     );
// })