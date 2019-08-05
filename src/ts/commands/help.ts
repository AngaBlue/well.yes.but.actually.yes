import { DirectThreadEntity } from "instagram-private-api";
import { DirectInboxFeedResponseItemsItem } from "instagram-private-api/dist/responses";

import index = require("../index")
module.exports = {
    name: "help",
    aliases: [],
    usage: "help",
    description: "Provides some help",
    run: async function (thread: DirectThreadEntity, message: DirectInboxFeedResponseItemsItem, args: string[]): Promise<any> {
        if (!args[0]) {
            let string = "Commands"
            for (let command in index.client.commands.registry) {
                string += `\n${index.config.prefix}${command}: ${index.client.commands.registry[command].description}`
            }
            return thread.broadcastText(string);
        } else {
            let command = index.client.commands.registry[args[0]]
            if (!command) return thread.broadcastText(`Unknown Command "${args[0]}"`);
            return thread.broadcastText(`${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)} Command\nDescription: ${command.description}\nAliases: ${command.aliases.join(", ") || "None"}\nUsage: ${index.config.prefix}${command.usage}`);
        }
    }
}