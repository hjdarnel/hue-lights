require('dotenv-safe').config();
const huejay = require('huejay');
const _ = require('lodash');

const { setScene } = require('./scenes');

if (!process.env.HUEUSER) {
    console.log('Missing environment var: HUEUSER');
    process.exit(1);
}

const USER = process.env.HUEUSER;

const init = async () => {
    const bridge = (await huejay.discover())[0];

    return client = new huejay.Client({
        host: bridge.ip,
        port: 80,
        username: USER,
        timeout:  15000
    });
};

const getGroup = async () => {
    const groups = await client.groups.getAll();
    return _.find(groups, ['attributes.attributes.name', "Henry’s Office"])
}

const toggle = async (client, group) => {
    group.on = !group.on;
    client.groups.save(group);
};

try {
    init()
        .then((client) => {
            return getGroup(client)
                .then((group) => {
                    return [client, group]
                });
        })
        .then(([client, group]) => {
            if (process.argv.length > 2) {
                switch (process.argv[2]) {
                    case "scene":
                        setScene(client, process.argv[3]);
                        break;
                    default:
                        break;
                }
            } else {
                toggle(client, group);
            }
        });
} catch (err) {
    console.log(err);
}
