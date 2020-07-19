const app = require('./server')
const db = require('./server/db')
const PORT = process.env.PORT || 3000;



db.sync().then(() => {
    console.log('db synced');
    app.listen(PORT, () =>
        console.log(`studiously serving silly sounds on port http://localhost:${PORT}`)
    );
})