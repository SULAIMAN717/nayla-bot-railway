
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios');
const client = new Client();

client.on('qr', qr => qrcode.generate(qr, {small: true}));
client.on('ready', () => console.log('Nayla Bot is ready!'));

client.on('message', async msg => {
    const webhookUrl = "http://localhost:5678/webhook-test/8e2c55bc-c1e4-45bb-96ec-bfe8fb9c8c3c";
    const payload = { sessionId: msg.from, chatInput: msg.body, action: "sendMessage" };

    try {
        const response = await axios.post(webhookUrl, payload);
        const reply = response.data.reply || "Terima kasih, pesan Anda sudah diterima.";
        msg.reply(reply);
    } catch (err) {
        msg.reply("Maaf, terjadi kesalahan saat menghubungi sistem.");
    }
});

client.initialize();
