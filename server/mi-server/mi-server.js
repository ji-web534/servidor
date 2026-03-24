const express = require('express');
const app = express();
const PORT = 4000;
const cors = require('cors');
;
app.use(cors()); // 2. Le damos permiso a React para entrar
app.get('/market/:coin', async (req, res) => { 
    
    // 2. TODO el código debe ir AQUÍ ADENTRO para que funcione cada vez que alguien entra
    const monedaSolicitada = req.params.coin;

    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
    params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 10,
        page: 1,
        sparkline: false
    },
    headers: {
        'Accept': 'application/json',
        'User-Agent': 'MiAppCrypto/1.0' // Esto ayuda a que no te bloqueen
    }
});

        // Buscamos la moneda específica dentro de lo que nos dio la API
        const datosMoneda = response.data.find(c => c.id === monedaSolicitada.toLowerCase());

        res.json({ 
            mensaje: "Datos recibidos",
            nombre: monedaSolicitada.toUpperCase(),
            id: monedaSolicitada.toLowerCase(),
            precioActual: datosMoneda ? datosMoneda.current_price : "No encontrado",
            datosAPI: response.data 
        });

    } catch (error) {
        console.error("Error al conectar con la API:", error.message);
        res.status(500).json({ error: "No se pudo obtener la información" });
    }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Prueba este link: http://localhost:${PORT}/market/bitcoin`);
});