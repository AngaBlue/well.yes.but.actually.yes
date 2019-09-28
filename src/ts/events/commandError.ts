import index = require("../index")
import { Command } from "../typings/Client/CommandHandler/Command"

module.exports.run = async (command: Command, error: Error) => {
    console.error(`Error in ${command.name}:\n${JSON.stringify(error)}`)
}