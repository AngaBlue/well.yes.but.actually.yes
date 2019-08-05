import { DirectThreadEntity } from "instagram-private-api";
import { DirectInboxFeedResponseItemsItem } from "instagram-private-api/dist/responses";

import index = require("../index")
module.exports = {
    name: "reload",
    aliases: [],
    usage: "reload <command>",
    description: "Reload a command",
    permission: "owner",
    run: async function (thread: DirectThreadEntity, message: DirectInboxFeedResponseItemsItem, args: string[]): Promise<any> {
        if (!args[0]) return thread.broadcastText("Please mention a command name to reload")
        args[0] = args[0].toLowerCase()
        try {
            let command = index.client.commands.reload(args[0])
            return thread.broadcastText(`Reloaded ${index.config.prefix}${command.name} command.`)
        } catch (error) {
            if (error.message.search("Unknown Command") > -1)
                return thread.broadcastText(`Unknown Command "${args[0]}"`)
            return thread.broadcastText(`Error encountered while reloading command. Please see logs for details`)
        }
    }
}