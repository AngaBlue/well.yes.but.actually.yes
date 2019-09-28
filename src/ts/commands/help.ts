import index = require("../index")
import { Message } from "../typings/Client/Message";
import { Command } from "../typings/Client/CommandHandler/Command";
module.exports = {
    name: "help",
    aliases: ['h'],
    usage: "help",
    description: "Provides some help",
    permission: 0,
    run: async function (message: Message): Promise<any> {
        if (!message.args[0]) {
            return message.thread.broadcastText([
                "Commands".__bold(),
                ...Object.values(index.client.commands.registry).map((command: Command) => `${index.config.prefix}${command.name.__bold()}: ${command.description}`),
                "\nUse !help <command> to get more information on specific command usage"
            ].join("\n"));
        } else {
            let command = index.client.commands.registry[index.client.commands.map[message.args[0]]]
            if (!command) return message.thread.broadcastText(`Unknown Command "${message.args[0]}"`);
            return message.thread.broadcastText([
                `${command.name.__titleCase()} Command`.__bold(),
                `${"Description".__bold()}: ${command.description}`,
                `${"Aliases".__bold()}: ${command.aliases.join(", ") || "None"}`,
                `${"Usage".__bold()}: ${index.config.prefix}${command.usage}`,
                `${"Permission Required".__bold()}: ${command.permission}${message.user.rank.permission < command.permission ? '❌' : '✔️'}`
            ].join("\n"));
        }
    }
}