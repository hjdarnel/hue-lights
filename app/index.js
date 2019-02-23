require('dotenv-safe').config();
const huejay = require('huejay');
const _ = require('lodash');

if (!process.env.HUEUSER) {
    console.log('Missing environment var: HUEUSER');
    process.exit(1);
}

const USER = process.env.HUEUSER;
let client;

const init = async () => {
    const bridge = (await huejay.discover())[0];

    client = new huejay.Client({
        host: bridge.ip,
        port: 80,
        username: USER,
        timeout:  15000
    });
};

const start = async () => {
    console.log(USER);
    const groups = await client.groups.getAll();

    const henryGroup = _.find(groups, ['attributes.attributes.name', "Henry’s Office"])
    henryGroup.on = !henryGroup.on;

    client.groups.save(henryGroup);
};

init().then(() => {
    start();
}).catch((err) =>{
    console.log(err);
})
