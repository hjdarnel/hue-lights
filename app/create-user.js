const huejay = require('huejay');

huejay.discover().then((bridges) => {
    const bridge = bridges[0];

    let client = new huejay.Client({
        host:     bridge.ip,
        port:     80
      });

    let user = new client.users.User;

    user.deviceType = 'node'; // Default is 'huejay'

    client.users.create(user)
        .then(user => {
            console.log(`New user created - Username: ${user.username}`);
        })
        .catch(error => {
            if (error instanceof huejay.Error && error.type === 101) {
            return console.log(`Link button not pressed. Try again...`);
            }

            console.log(error.stack);
        });
});
