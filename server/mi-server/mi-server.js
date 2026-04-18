const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 4000;

// . Le damos permiso a React para entrar
const app = express();
const PORT = 4000;

// . Le damos permiso a React para entrar
app.use(cors());

app.get('/market/all', async (req, res) => {
    try {
        console.log(`📩 Petición: Listado para Sidebar`);
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`;
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error("❌ Error en listado:", error.message);
        res.status(500).json({ error: "Error en servidor" });
    }
});

app.get('/market/history/:id', async (req, res) => {
    // 2. TODO el código debe ir AQUÍ ADENTRO para que funcione cada vez que alguien entra
    
    try {
        const { id } = req.params;
        console.log(`\n📩 Petición recibida: Historial de ${id}`);

        // 1. Usamos la URL de 'market_chart' (esta es la que trae los precios históricos)
        const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7&interval=daily`;
        
        const response = await axios.get(url);
        
        // 2. IMPORTANTE: No busques "moneda" aquí. 
        // CoinGecko ya te da el objeto con los precios en response.data.prices
        if (!response.data || !response.data.prices) {
            return res.status(404).json({ error: "No se encontraron datos" });
        }

        // 3. Enviamos el Array transformado con fecha y precio
        const formattedData = response.data.prices.map(p => ({
            fecha: new Date(p[0]).toISOString().split('T')[0],
            precio: p[1]
        }));

        console.log(`✅ Enviando historial de ${id} al gráfico`);
        res.json(formattedData);

    } catch (error) {
        console.error("❌ ERROR:", error.message);
        res.status(500).json({ error: "Error de conexión con la API" });
    }
});

app.listen(PORT, () => {
    console.log(`-----------------------------------------`);
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`👉 Prueba este link: http://localhost:${PORT}/market/history/bitcoin`);
    console.log(`-----------------------------------------`);
});