const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 4000;

// . Le damos permiso a React para entrar
app.use(cors());

app.get('/market/all', async (req, res) => {
    // 2. TODO el código debe ir AQUÍ ADENTRO para que funcione cada vez que alguien entra
    
    
    try {
        console.log(`\n📩 Petición recibida: Listado completo`);

        // 1. Usamos la URL de 'markets' (esta ya trae el Top 10)
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`;
        
        const response = await axios.get(url);
        
        // 2. IMPORTANTE: No busques "moneda" aquí. 
        // CoinGecko ya te da el Array directo en response.data
        if (!response.data || response.data.length === 0) {
            return res.status(404).json({ error: "No se encontraron datos" });
        }

        console.log("✅ Enviando lista de 10 monedas al Sidebar");

        // 3. Enviamos el Array tal cual
        res.json(response.data);

    } catch (error) {
        console.error("❌ ERROR:", error.message);
        res.status(500).json({ error: "Error de conexión con la API" });
    }
});

app.listen(PORT, () => {
    console.log(`-----------------------------------------`);
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`👉 Prueba este link: http://localhost:${PORT}/market/bitcoin`);
    console.log(`-----------------------------------------`);
});