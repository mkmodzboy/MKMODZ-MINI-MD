// lib/autoreact.js
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'autoreact',
    async execute(sock, message, args) {
        const chatJid = message.key.remoteJid;
        const dbPath = path.join(__dirname, '../database.json');
        const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

        if (!db.autoreact) db.autoreact = {};

        if (args[0] === 'on') {
            db.autoreact[chatJid] = '❤️'; // Default emoji (aap badal sakte hain)
            fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
            await message.reply('✅ *Autoreact ON* ho gaya! Har message par ❤️ react karunga.');
        } 
        else if (args[0] === 'off') {
            db.autoreact[chatJid] = false;
            fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
            await message.reply('❌ *Autoreact OFF* ho gaya.');
        } 
        else {
            await message.reply('⚠️ Format: .autoreact on / off');
        }
    }
};