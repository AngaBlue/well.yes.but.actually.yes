import { DirectThreadEntity } from "instagram-private-api";
import { DirectInboxFeedResponseItemsItem } from "instagram-private-api/dist/responses";

import index = require("../index")
module.exports = {
    name: "unload",
    aliases: [],
    usage: "unload <command>",
    description: "Unloads a command",
    permission: "owner",
    run: async function (thread: DirectThreadEntity, message: DirectInboxFeedResponseItemsItem, args: string[]): Promise<any> {
        if (!args[0]) return thread.broadcastText("Please mention a command name to unload")
        args[0] = args[0].toLowerCase()
        try {
            index.client.commands.unload(args[0])
            return thread.broadcastText(`Unloaded ${index.config.prefix}${args[0]} command.`)
        } catch (error) {
            if (error.message.search("Unknown Command") > -1)
                return thread.broadcastText(`Unknown Command "${args[0]}"`)
            return thread.broadcastText(`Error encountered while unloading command. Please see logs for details`)
        }
    }
}