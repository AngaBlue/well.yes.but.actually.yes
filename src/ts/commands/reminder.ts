import index = require("../index")
import { Message } from "../typings/Client/Message";
import * as moment from "moment";
import { Reminder } from "../typings/Client/DatabaseObjects";
module.exports = {
    name: "reminder",
    aliases: [],
    usage: "reminder set 1h Have fun!",
    description: "Sets a reminder for later!",
    permission: 0,
    run: async function (message: Message): Promise<any> {
        function errorMessage(text: string) {
            message.thread.broadcastText(`${"Reminder Command Failed".__bold()}\n${text}`)
        }
        if (!message.args[0])
            return errorMessage("Please use either `list`, `set` or `remove`.")
        message.args[0] = message.args[0].toLowerCase()
        if (['list', 'set', 'remove'].indexOf(message.args[0]) === -1)
            return errorMessage("Please use either `list`, `set` or `remove`.")
        switch (message.args[0]) {
            case 'list':
                let reminders = await index.client.db.asyncQuery!(`SELECT * FROM reminders WHERE user = ?`, message.user.id)
                let reminderStrings: string[] = reminders.map((reminder: Reminder): string => [
                    `Reminder ${moment(reminder.time).fromNow()}`.__bold(),
                    `${"ID".__bold()}: ${reminder.id}`,
                    `${"Message".__bold()}: ${reminder.message}`
                ].join("\n")
                )
                return message.thread.broadcastText(`${"Upcoming Reminders".__bold()}\n${reminders.length === 0 ? "No reminders have been set yet" : reminderStrings.join("\n")}`)
            case 'set':
                    let timeAmount
                    try {
                        timeAmount = parseFloat(message.args[1].slice(0, -1))
                    } catch (error) {}
                    let remindTime = 0
                    if (!message.args[1] || !((["s", "m", "h", "d", "y"].indexOf(message.args[1].slice(-1)) > -1 && timeAmount !== undefined && timeAmount > 0)))
                        return errorMessage("Please enter a valid period of time until you are reminded.")
            
                    switch (message.args[1].slice(-1)) {
                        case "s":
                            remindTime = Math.ceil(timeAmount * 1000);
                            break;
                        case "m":
                            remindTime = Math.ceil(timeAmount * 60000);
                            break;
                        case "h":
                            remindTime = Math.ceil(timeAmount * 3600000);
                            break;
                        case "d":
                            remindTime = Math.ceil(timeAmount * 86400000);
                            break;
                        case "y":
                            remindTime = Math.ceil(timeAmount * 31556952000);
                            break;
                    }
                    let reminderMessage = message.args.slice(2).join(" ")
                    if (!reminderMessage || reminderMessage.length === 0)
                        return errorMessage("Please enter a message to remind yourself with.")
                    await index.client.db.asyncQuery!(`INSERT INTO reminders (user, message, time) VALUES (?, ?, ?)`, [message.user.id, reminderMessage, Date.now() + remindTime])
                    return message.thread.broadcastText([
                        `Reminder Set`.__bold(),
                        `You will be reminded ${moment(Date.now() + remindTime).fromNow()}`,
                        `${"Message".__bold()}: ${reminderMessage}`
                    ].join("\n"))
            case 'remove':
                if (!message.args[1])
                    return errorMessage("Please mention an ID of a reminder to remove that reminder.")
                let reminderToRemove: Reminder = (await index.client.db.asyncQuery!('SELECT * FROM reminders WHERE user = ? AND id = ?', [message.user.id, message.args[1]]))[0]
                if (!reminderToRemove)
                    return errorMessage("Please mention a valid ID of a reminder to remove that reminder.")
                await index.client.db.asyncQuery!(`DELETE FROM reminders WHERE id = ?`, reminderToRemove.id)
                return message.thread.broadcastText([
                    "Reminder Removed".__bold(),
                    `${"ID".__bold()}: ${reminderToRemove.id}`,
                    `${"Message".__bold()}: ${reminderToRemove.message}`
                ].join("\n"))
        }
    }
}