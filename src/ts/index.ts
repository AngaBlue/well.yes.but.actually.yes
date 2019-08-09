import * as fs from 'fs';
import { Client } from "./typings/Client"
import * as Database from "./typings/Database"
let config = require("./config.js");

let client = new Client();
export { client, config, Client };

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

//Database Connection
Database.connect(config.database).then(db => {
    exports.db = db
})

//Login
console.log("Logging in...")
client.logOn(config.instagram.username, config.instagram.password)