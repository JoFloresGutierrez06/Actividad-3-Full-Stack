// Redirigen el contenido al controlador
// Muestran los endpoints que se manejarán

const express = require('express');
const controller = require('../controllers/pedidos.controller');

const router = express.Router()

router.get('/',controller.getAll)           // GET /pedidos         - Muestra todos los pedidos
router.get('/:id',controller.getById)       // GET /pedidos/:id     - Muestra un pedido específico con su id
router.post('/',controller.create)          // POST /pedidos        - Permite registrar un nuevo pedido
router.put('/:id',controller.update)        // PUT  /pedidos/:id    - Permite modificar un pedido previamente registrado
router.delete('/:id', controller.remove)    // DELETE /pedidos/:id  - Permite eliminar únicamente los pedidos cancelados

module.exports = { router };