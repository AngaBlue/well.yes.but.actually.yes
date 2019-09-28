import * as fs from 'fs';
import { Client } from "./typings/Client"
import * as Database from "./typings/Database"
let config = require("./config.js");

//Load Modules
fs.readdir(`${__dirname}/modules/`, (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        require(`${__dirname}/modules/${file}`);
    });
});

//Create Client
let client = new Client();
client.connectDB(config.database)
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

//Login
console.log("Logging in...")
client.logOn(config.instagram.username, config.instagram.password)