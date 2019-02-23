const setScene = async (client, sceneName) => {
    try {
        switch (sceneName) {
            case "twilight":
                client.scenes.recall("SfXGev5SCCi2j1o");
                break;

            case "arctic-aurora":
                client.scenes.recall("4Xea4XmitswwKUO");

                client.lights.getById(3)
                    .then((light) => {
                        light.brightness = 100;
                        return client.lights.save(light);
                    })
                    .then(() => {
                        return client.lights.getById(1);
                    })
                    .then((light) => {
                        light.brightness = 200;
                        return client.lights.save(light);
                    });
                break;

            case "savannah-sunset":
                client.scenes.recall("FlzzgdK-Oe8CUAW");
                break;

            case "relax":
                client.scenes.recall("YIDevdWby670p-o");
                break;

            default:
                break;
        }
    } catch (err) {
        console.log("Error setting scene", err);
    }
};

module.exports = { setScene };