// lib/autofollow.js
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'autofollow',
    async execute(sock, message, args) {
        const chatJid = message.key.remoteJid;
        const dbPath = path.join(__dirname, '../database.json');
        const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

        if (!db.autofollow) db.autofollow = {};

        if (args.length === 2) {
            const source = args[0] + '@g.us'; // Channel/Group ID
            const target = args[1] + '@g.us'; // Target Group ID
            db.autofollow[chatJid] = { source, target };
            fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
            await message.reply(`📢 Ab *${source}* ki har message *${target}* par forward hogi.`);
        } else {
            await message.reply('⚠️ Format: .autofollow [ChannelID] [TargetGroupID]');
        }
    }
};