const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 4000;

// . Le damos permiso a React para entrar
app.use(cors());

app.get('/market/:coin', async (req, res) => {
    // 2. TODO el código debe ir AQUÍ ADENTRO para que funcione cada vez que alguien entra
    
    try {
        const monedaBruta = req.params.coin;
        if (!monedaBruta) return res.status(400).json({ error: "No enviaste ninguna moneda" });

        const moneda = monedaBruta.toLowerCase(); // CoinGecko usa minúsculas
        
        console.log(`\n📩 Petición recibida para: ${moneda}`);

        // Usamos la API de CoinGecko (Sin restricciones de país)
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=${moneda}&vs_currencies=usd`;
        console.log(`🌐 Llamando a CoinGecko API...`);

        const response = await axios.get(url);
        
        // Verificamos si la moneda existe en la respuesta de la API
        if (!response.data[moneda]) {
            console.log(`⚠️ La moneda "${moneda}" no fue encontrada.`);
            return res.status(404).json({ error: "Moneda no encontrada. Prueba con 'bitcoin' o 'ethereum'" });
        }

        const precio = response.data[moneda].usd;
        console.log("✅ Datos recibidos con éxito");

        res.json({
            mensaje: "Datos recibidos con éxito",
            nombre: moneda,
            precioActual: precio.toFixed(2), // Precio formateado a 2 decimales
            datosCompletos: response.data
        });

    } catch (error) {
        console.error("❌ ERROR EN LA PETICIÓN:", error.message);
        res.status(500).json({ 
            error: "Error al conectar con el servidor de precios", 
            detalle: error.message 
        });
    }
});

app.listen(PORT, () => {
    console.log(`-----------------------------------------`);
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`👉 Prueba este link: http://localhost:${PORT}/market/bitcoin`);
    console.log(`-----------------------------------------`);
});