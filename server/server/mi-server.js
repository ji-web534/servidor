const express = require('express');
const app = express();
const PORT = 4000;
const cors = require('cors');

app.use(cors()); // 2. Le damos permiso a React para entrar

// 3. Definimos la ruta /market/:coin
app.get('/market/:coin', (req, res) => {
  // Sacamos el nombre de la moneda de la URL
  const monedaSolicitada = req.params.coin;

  // Creamos los datos ADENTRO de la función
  const datosCripto = {
    nombre: monedaSolicitada.toUpperCase(),
    precio: Math.floor(Math.random() * 50000), 
    simbolo: monedaSolicitada.substring(0, 3).toUpperCase(),
    historial: [100, 150, 120, 180, 200] 
  };

  // Enviamos la respuesta y terminamos
  res.json(datosCripto);
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor de la API corriendo en http://localhost:${PORT}`);
  console.log(`Prueba este link: http://localhost:${PORT}/market/bitcoin`);
});