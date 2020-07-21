const db = require('./server/db/')
const { User, Pool } = require('./server/db/models/');

async function seed() {
    await db.sync({ force: true })
    console.log('db synced!')
    await User.create({ cookie_id: 111 })
    // .then(data => data.createPool({ name: "hz" })).then(d => { console.log(d) });
    await User.findOne({ where: { cookie_id: "111" } })
    .then(i => i.createPool({ poolName: "hz" }));
    // .then(i => {console.log(i.__proto__)});
    await User.findOne({ where: { cookie_id: "111" },include:[Pool] }).then(i => {console.log(i)});
}

async function runSeed() {
    console.log('seeding...')
    try {
        await seed()
    } catch (err) {
        console.error(err)
        process.exitCode = 1
    }
}

runSeed()

module.exports = seed;