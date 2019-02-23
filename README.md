# hue-lights
A Node script to control Hue lights in my office via StreamDeck (via Windows batch files in background)

Uses the excellent NodeJS lib [Huejay](https://github.com/sqmk/huejay) 🐦

See their dope documentation [here](https://github.com/sqmk/huejay#client-usage).

## install
```bash
git clone https://github.com/hjdarnel/hue-lights.git
cd hue-lights
npm install

# create node user on Bridge
npm run create-user

# edit .env with HUEUSER=<mynewusername>
echo "HUEUSER=<mynewusername>" >> .env
```

Run `npm run start` to toggle lights. `npm run start -- scene arctic-aurora` to change to arctic aurora scene. Scenes are hardcoded in `app/scenes.js`.

Batch files in `batch/` are used to run Node scripts in the background - looking for a cleaner way to do this.

## debug
Debugging can be done at `http://<mybridgeip>/debug/clip.html`, for example to get scenes or other one-off commands.
