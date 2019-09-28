import index = require("../index")
import { Message } from "../typings/Client/Message";
module.exports = {
    name: "load",
    aliases: [],
    usage: "load <command>",
    description: "Loads a command",
    permission: 5,
    run: async function (message: Message): Promise<any> {
        if (!message.args[0]) return message.thread.broadcastText("Please mention a command file to load")
        message.args[0] = message.args[0].toLowerCase()
        try {
            let command = index.client.commands.load(`${__dirname}/${message.args[0]}`)
            return message.thread.broadcastText(`Loaded ${index.config.prefix}${command.name.__bold()} command.`)
        } catch (error) {
            console.log(error)
            if (error.message.search("Unknown/Invalid Command") > -1)
                return message.thread.broadcastText(`Unknown Command "commands/${message.args[0]}"`)
            return message.thread.broadcastText(`Error encountered while loading command. Please see logs for details`)
        }
    }
}