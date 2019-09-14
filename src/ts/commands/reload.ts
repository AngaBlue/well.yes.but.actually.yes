import index = require("../index")
import { Message } from "../typings/Client/Message";
module.exports = {
    name: "reload",
    aliases: [],
    usage: "reload <command>",
    description: "Reload a command",
    permission: 5,
    run: async function (message: Message): Promise<any> {
        if (!message.args[0]) return message.thread.broadcastText("Please mention a command name to reload")
        message.args[0] = message.args[0].toLowerCase()
        try {
            let command = index.client.commands.reload(message.args[0])
            return message.thread.broadcastText(`Reloaded ${index.config.prefix}${command.name} command.`)
        } catch (error) {
            if (error.message.search("Unknown Command") > -1)
                return message.thread.broadcastText(`Unknown Command "${message.args[0]}"`)
            return message.thread.broadcastText(`Error encountered while reloading command. Please see logs for details`)
        }
    }
}