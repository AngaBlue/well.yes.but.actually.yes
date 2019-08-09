import { DirectThreadEntity } from "instagram-private-api";
import { DirectInboxFeedResponseItemsItem } from "instagram-private-api/dist/responses";
import * as moment from "moment";

import index = require("../index")
module.exports = {
    name: "load",
    aliases: [],
    usage: "load <command>",
    description: "Loads a command",
    permission: "owner",
    run: async function (thread: DirectThreadEntity, message: DirectInboxFeedResponseItemsItem, args: string[]): Promise<any> {
        if (!args[0]) return thread.broadcastText("Please mention a command file to load")
        args[0] = args[0].toLowerCase()
        try {
            let command = index.client.commands.load(`${__dirname}/${args[0]}`)
            return thread.broadcastText(`Reloaded ${index.config.prefix}${command.name} command.`)
        } catch (error) {
            console.log(error)
            if (error.message.search("Unknown Command") > -1)
                return thread.broadcastText(`Unknown Command "commands/${args[0]}"`)
            return thread.broadcastText(`Error encountered while loading command. Please see logs for details`)
        }
    }
}