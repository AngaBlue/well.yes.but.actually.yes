import * as fs from 'fs';
import { AccountRepositoryLoginResponseLogged_in_user } from 'instagram-private-api/dist/responses';
import { Client } from "./typings/Client"
let config = require("./config.js");

let client = new Client();
export { client, config };

//Load Commands
let commandFiles = fs.readdirSync(`${__dirname}/commands`)
commandFiles.forEach(file => {
    client.commands.load(`${__dirname}/commands/${file}`)
});
//Bind Events
fs.readdir(`${__dirname}/events/`, (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        let eventFunction = require(`${__dirname}/events/${file}`);
        let eventName = file.split(".")[0]
        client.events.on(eventName, (...args) => eventFunction.run(...args));
    });
});

client.ig.state.generateDevice(config.instagram.username);

let lastMessageReceived: { [index: string]: number } = {}

function checkMessageReceive(loggedInClient: AccountRepositoryLoginResponseLogged_in_user): void {
    setInterval(async () => {
        const inboxFeed = client.ig.feed.directInbox();
        let threads = await inboxFeed.items();
        threads.forEach(thread => {
            if (thread.users.length !== 1) return
            if (!thread.items[0]) return
            //Set most recent message received
            lastMessageReceived[thread.thread_id] = parseInt(thread.items[0].timestamp.slice(0, -3))
            for (let i in thread.items) {
                //Check if Message Author is Client
                if (thread.items[i].user_id === loggedInClient.pk) continue
                let timestamp = parseInt(thread.items[i].timestamp.slice(0, -3))
                //Check Longer than 3 secs ago
                if (Date.now() - 3000 > timestamp) return
                //Check if already emitted
                if (lastMessageReceived[thread.thread_id] && lastMessageReceived[thread.thread_id] > timestamp) return
                client.events.emit('message', client.ig.entity.directThread(thread.thread_id), thread.items[i])
            }
        })
    }, 1000)
}

(async () => {
    console.log("Logging in...")
    await client.ig.simulate.preLoginFlow();
    let loggedInClient = await client.ig.account.login(config.instagram.username, config.instagram.password);
    console.log(`Logged in as "${loggedInClient.username}"`)
    checkMessageReceive(loggedInClient);
})();