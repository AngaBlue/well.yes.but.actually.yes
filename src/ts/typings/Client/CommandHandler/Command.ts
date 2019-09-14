import { Message } from "../Message";

export interface Command {
    path: string,
    name: string,
    aliases: string[],
    usage: string[],
    description: string,
    category: string,
    permission: number,
    run(message: Message): Promise<any>,
}

export class Command {
    constructor(path: string) {
        let commandFile = require(path)
        if (!commandFile || !commandFile.name) throw new Error(`Unknown/Invalid Command File at "${path}"`)
        this.path = path
        this.name = commandFile.name
        this.aliases = commandFile.aliases || []
        this.usage = commandFile.usage || commandFile.name
        this.description = commandFile.description || ""
        this.category = commandFile.category || "general"
        this.permission = commandFile.permission || 0
        this.run = commandFile.run || (() => { })
    }
}
