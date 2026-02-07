// Decide los códigos HTTP
// Valida datos
// Decide errores

const { PedidosRepository } = require('../repositories/pedidos.repository');

const repo = new PedidosRepository();

function getAll(req, res) {
    return res.json(repo.getAll())
}

function getById(req, res) {
  const id = Number(req.params.id)
  const pedido = repo.getById(id)

  if (!pedido) {
    return res.status(404).json({error: 'Pedido no encontrado'})
  }

  return res.json(pedido)
}

function create(req, res) {
  const { producto, cantidad } = req.body;

  if (!producto || typeof producto !== 'string') { // Valida que todo bien con producto
    return res.status(400).json({error: 'Producto inválido'})
  }

  const cantidadNumber = Number(cantidad);
  if (!cantidad || cantidad <= 0) {
    return res.status(400).json({error: 'Cantidad inválida'})
  }

  const nuevo = repo.create(producto, cantidadNumber )
  return res.status(201).json(nuevo)
}

function update(req, res) {
  const { producto, cantidad, estado } = req.body;
  
  // Validar datos
  if (!producto || typeof producto !== 'string') {
    return res.status(400).json({error: 'Producto inválido'})
  }

  // const cantidadNumber = Number(cantidad);
  if (typeof cantidad !== "number"|| !cantidad || cantidad <= 0) {
    return res.status(400).json({error: 'Cantidad inválida'})
  }

  if (!estado || typeof estado !== 'string') {
    return res.status(400).json({error: 'Estado inválido'})
  }
  if(estado !== "completado" && estado !== "cancelado") {
    return res.status(400).json({error: 'Movimiento ilegal. Pedido únicamente alterable a estado "cancelado"/"completado"'})
  }
  
  const id = Number(req.params.id);
  const actualizado = repo.update(id, req.body)

  if (actualizado === -1) { // No existe el pedido
    return res.status(404).json({error: 'No encontrado'})
  }
  
  if (actualizado === -2) { // Pedido inmodificable. No está en estado "pendiente"
    return res.status(400).json({error: 'Movimiento inválido. Pedido inalterable.'})
  }
  return res.json(actualizado)
}

function remove(req, res) {
    const id = Number(req.params.id);
    const ok = repo.delete(id)

    if (ok === -1) { 
        return res.status(404).json({error: 'Pedido no encontrado.'})
    }

    if (ok === -2) {
        return res.status(400).json({error: 'Pedido inválido para eliminarse.'})
    }

    return res.status(204).send()
}

module.exports = { getAll, getById, create, update, remove }