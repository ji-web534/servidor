const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 5000;

app.use(cors());

console.log("-----------------------------------------");
console.log("🔥 EL SERVIDOR ESTÁ INTENTANDO ARRANCAR...");
console.log("-----------------------------------------");

app.get('/market/:coin', async (req, res) => {
    const moneda = req.params.coin.toUpperCase();
    console.log(`\n📩 Petición recibida para: ${moneda}`);

    try {
        const symbol = `${moneda}USDT`;
        console.log(`🌐 Llamando a Binance API para: ${symbol}`);

        const response = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
        
        console.log("✅ Binance respondió con éxito");
        res.json(response.data);

    } catch (error) {
        console.error("❌ ERROR EN LA PETICIÓN:");
        if (error.response) {
            console.error(`Código: ${error.response.status} - Info: ${JSON.stringify(error.response.data)}`);
            res.status(error.response.status).json(error.response.data);
        } else {
            console.error(`Mensaje: ${error.message}`);
            res.status(500).json({ error: "Error de conexión", mensaje: error.message });
        }
    }
});

app.listen(PORT, () => {
    console.log(`🚀 SERVIDOR LISTO EN EL PUERTO ${PORT}`);
    console.log(`👉 Prueba este link: http://localhost:${PORT}/market/btc`);
});