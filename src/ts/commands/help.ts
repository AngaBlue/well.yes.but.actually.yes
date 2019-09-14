import index = require("../index")
import { Message } from "../typings/Client/Message";
module.exports = {
    name: "help",
    aliases: [],
    usage: "help",
    description: "Provides some help",
    permission: 0,
    run: async function (message: Message): Promise<any> {
        if (!message.args[0]) {
            let string = "Commands"
            for (let command in index.client.commands.registry) {
                if (message.user.rank.hierachy < index.client.commands.registry[command].permission) continue;
                string += `\n${index.config.prefix}${command}: ${index.client.commands.registry[command].description}`
            }
            return message.thread.broadcastText(string);
        } else {
            let command = index.client.commands.registry[message.args[0]]
            if (!command) return message.thread.broadcastText(`Unknown Command "${message.args[0]}"`);
            return message.thread.broadcastText(`${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)} Command\nDescription: ${command.description}\nAliases: ${command.aliases.join(", ") || "None"}\nUsage: ${index.config.prefix}${command.usage}`);
        }
    }
}