const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion } = require("@whiskeysockets/baileys");
const axios = require("axios");

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("auth_info");
    const { version } = await fetchLatestBaileysVersion();
    const sock = makeWASocket({ auth: state, version });

    sock.ev.on("messages.upsert", async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message) return;

        const text = msg.message.conversation || msg.message.extendedTextMessage?.text || "";
        const sender = msg.key.remoteJid;

        if (text && sender) {
            try {
                const response = await axios.post("http://localhost:5678/webhook/nayla", {
                    sender,
                    text
                });
                const reply = response.data.reply || "Nayla sedang berpikir...";

                await sock.sendMessage(sender, { text: reply });
            } catch (err) {
                console.error("Gagal konek ke N8N:", err);
            }
        }
    });

    sock.ev.on("creds.update", saveCreds);
    console.log("✅ Nayla Bot aktif dan terhubung ke WhatsApp + N8N");
}

startBot();