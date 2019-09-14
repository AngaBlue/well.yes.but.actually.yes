import index = require("../index")
import { Message } from "../typings/Client/Message";
module.exports = {
    name: "unload",
    aliases: [],
    usage: "unload <command>",
    description: "Unloads a command",
    permission: 5,
    run: async function (message: Message): Promise<any> {
        if (!message.args[0]) return message.thread.broadcastText("Please mention a command name to unload")
        message.args[0] = message.args[0].toLowerCase()
        try {
            index.client.commands.unload(message.args[0])
            return message.thread.broadcastText(`Unloaded ${index.config.prefix}${message.args[0]} command.`)
        } catch (error) {
            if (error.message.search("Unknown Command") > -1)
                return message.thread.broadcastText(`Unknown Command "${message.args[0]}"`)
            return message.thread.broadcastText(`Error encountered while unloading command. Please see logs for details`)
        }
    }
}