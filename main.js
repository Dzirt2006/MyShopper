const app = require('./server')
const db = require('./server/db')
const PORT = process.env.PORT || 8000;

// async function start() {
// //delete force:true on deploy!
//     await db.sync({ force: false }).then(() => {
//         console.log('db synced');
//         app.listen(PORT, () =>
//             console.log(`studiously serving silly sounds on port http://localhost:${PORT}`)
//         );
//     })
// }

// start();

db.sync().then(() => {
    console.log('db synced');
    app.listen(PORT, () =>
        console.log(`studiously serving silly sounds on port http://localhost:${PORT}`)
    );
})