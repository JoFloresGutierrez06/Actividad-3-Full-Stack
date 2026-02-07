/* Configuraciones iniciales en consola:
    - npm init
    - npm install express
    ---------------------------------
    - npm install --save-dev nodemon
        *Cambiamos la variable de scripts en package por: "dev": "nodemon index.js"
    - npm run dev 
*/

const express = require('express')
const { router: pedidosRouter } = require('./src/routes/pedidos.routes')

const app = express()
app.use(express.json())

app.get('/', (req, res) => { res.send('API OK'); })

app.use('/pedidos', pedidosRouter);

// Listener
app.listen(3000, () => { console.log("Servidor Corriendo") })