import index = require("../index")

let lastMessageReceived: { [index: string]: number } = {}
module.exports.run = async () => {
    console.log(`Logged in as "${index.client.igLoggedIn.username}"`)
    setInterval(async () => {
        const inboxFeed = index.client.ig.feed.directInbox();
        let threads = await inboxFeed.items();
        threads.forEach(thread => {
            if (thread.users.length !== 1) return
            if (!thread.items[0]) return
            //Set most recent message received
            lastMessageReceived[thread.thread_id] = parseInt(thread.items[0].timestamp.slice(0, -3))
            for (let i in thread.items) {
                //Check if Message Author is Client
                if (thread.items[i].user_id === index.client.igLoggedIn.pk) continue
                let timestamp = parseInt(thread.items[i].timestamp.slice(0, -3))
                //Check Longer than 3 secs ago
                if (Date.now() - 3000 > timestamp) return
                //Check if already emitted
                if (lastMessageReceived[thread.thread_id] && lastMessageReceived[thread.thread_id] > timestamp) return
                index.client.events.emit('message', index.client.ig.entity.directThread(thread.thread_id), thread.items[i])
            }
        })
    }, 1000)
}