const db = require('./server/db/')
const {User, Pool} = require('./server/db/models/');

async function seed() {
    await db.sync({force: true})
    console.log('db synced!')
    await User.create({email: 111})
    // .then(data => data.createPool({ name: "hz" })).then(d => { console.log(d) });
    await User.findOne({where: {email: "111"}})
        .then(i => i.createPool({poolName: "hz",ownerId:1}));
    // .then(i => {console.log(i.__proto__)});
    await User.findOne({where: {email: "111"}, include: [Pool]}).then(i => {
        console.log(i)
    });
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


// const arr = []
// for (let key in some) {
//     if (!!some[key].data) {
//         if (!!x.data.trim())
//             arr.push(some[key])
//     } else if (!!x.checkValidity) {
//         arr.push(some[key])
//     }
// }
// const func = (x) => {
//     for (const key in s) {
//         const data = s[key].data;
//         if (data) {
//             return s[key].previousSibling.checked
//         }
//     }
// }
// const funcSwitch = (x) => {
//     for (const key in nodeElements) {
//         const data = nodeElements[key].data;
//         if (data) {
//             if (data.trim() === x) {
//                 const node= nodeElements[key].previousSibling
//                 node.checked=!node.checked;
//             }
//         }
//     }
// }

// let arr=[];
// for (const key in some){
//     if(some[key].hasOwnProperty("draggable")) arr.push(some[key])
// }
