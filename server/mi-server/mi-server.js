const express = require('express');
const app = express();
const PORT = 4000;
const cors = require('cors');
;
app.use(cors()); // 2. Le damos permiso a React para entrar

// 3. Definimos la ruta /market/:coin 
// ahora con la api 
app.get('/api/criptos', async ( res) => {
      // Sacamos el nombre de la moneda de la URL
 const monedaSolicitada = req.params.coin;
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
            params: {
                vs_currency: 'usd',
                order: 'market_cap_desc',
                per_page: 10,
                page: 1,
                sparkline: false
            }
        });
        res.json({ 
            mensaje: "Datos recibidos",
            nombre: monedaSolicitada.toUpperCase(),
            id: monedaSolicitada.toLowerCase()
        });
    } catch (error) {
        console.error("Error al conectar con la API:", error.message);
        res.status(500).json({ error: 'No se pudo obtener la información' });
    }
});


  
 


app.listen(PORT, () => {
  console.log(`🚀 Servidor de la API corriendo en http://localhost:${PORT}`);
  console.log(`Prueba este link: http://localhost:${PORT}/market/bitcoin`);
});