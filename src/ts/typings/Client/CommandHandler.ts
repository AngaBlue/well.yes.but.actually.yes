import { Command } from './CommandHandler/Command';

export interface CommandHandler {
    map: {
        [index: string]: Command["name"]
    }
    registry: {
        [index: string]: Command
    }
}

export class CommandHandler {
    constructor() {
        this.map = {}
        this.registry = {}
    }
    public load (path: string): Command {
        let command = new Command(path)
        this.registry[command.name] = command
        this.map[command.name] = command.name
        command.aliases.forEach(alias => {
            this.map[alias] = command.name
        })
        return command
    }
    public unload (commandResolvable: string) {
        let command = this.registry[this.map[commandResolvable]]
        if (!command) throw new Error(`Unknown Command "${commandResolvable}"`)
        this.map[command.name] = command.name
        for (let alias in this.map) {
            if (this.map[alias] === command.name) delete this.map[alias]
        }
        delete this.registry[command.name]
        delete require.cache[require.resolve(command.path)]

    }
    public reload(commandResolvable: string): Command {
        let command = this.registry[commandResolvable]
        if (!command) throw new Error(`Unknown Command "${commandResolvable}"`)
        this.unload(command.name)
        return this.load(command.path)
    }
}