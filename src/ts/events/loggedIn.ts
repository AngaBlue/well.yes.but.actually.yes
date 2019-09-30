import index = require("../index")
import { Reminder } from "../typings/Client/DatabaseObjects"

let lastMessageReceived: { [index: string]: number } = {}
module.exports.run = async () => {
    console.log(`Logged in as "${index.client.igLoggedIn.username}"`)
    console.log(`Bot online and listening for messages...`)
    try {
        //Check Messages
        setInterval(async () => {
            const inboxFeed = index.client.ig.feed.directInbox();
            let threads
            try {
                threads = await inboxFeed.items() || []
            } catch (e) {
                if (e.error && e.error.code === "ETIMEDOUT") return
                console.error(Object.keys(e), JSON.stringify(e, null, 2));
            }
            threads = threads || []
            threads.forEach(thread => {
                if (!thread.items[0]) return
                for (let i in thread.items) {
                    let timestamp = parseInt(thread.items[i].timestamp.slice(0, -3))
                    //Check Longer than 3 secs ago
                    if (Date.now() - 3000 > timestamp) return
                    //Check if already emitted
                    if (lastMessageReceived[thread.thread_id] && lastMessageReceived[thread.thread_id] >= timestamp) return
                    index.client.events.emit('message', thread, thread.items[i])
                    //Set most recent message received
                    lastMessageReceived[thread.thread_id] = parseInt(thread.items[i].timestamp.slice(0, -3))
                }
            })
        }, 500)
        //Reminders
        setInterval(async () => {
            let timestamp = Date.now()
            let reminders: Reminder[] = await index.client.db.asyncQuery!(`SELECT * FROM reminders WHERE time < ?`, timestamp)
            reminders.forEach((reminder: Reminder) => {
                index.client.ig.entity.directThread([reminder.user.toString()]).broadcastText([
                    "Reminder".__bold(),
                    reminder.message
                ].join("\n"));
            })
            index.client.db.asyncQuery!(`DELETE FROM reminders WHERE time < ?`, timestamp)
        }, 3000)
    } catch (error) {
        console.error(error.name)
    }
}