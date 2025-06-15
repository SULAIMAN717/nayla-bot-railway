
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/webhook', async (req, res) => {
    const message = req.body.message || 'Pesan kosong';
    try {
        const response = await axios.post(process.env.N8N_URL, {
            text: message
        });
        console.log('Berhasil kirim ke N8N:', response.data);
    } catch (err) {
        console.error('Gagal kirim ke N8N:', err.message);
    }
    res.send({ status: 'Pesan diterima' });
});

app.listen(PORT, () => {
    console.log(`✅ Nayla Bot aktif di PORT ${PORT}`);
});
