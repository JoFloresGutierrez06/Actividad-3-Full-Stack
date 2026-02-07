// Nota: Debe ser una clase

class PedidosRepository {
    #pedidos; #nextId; #id; #producto; #cantidad; #estado; // establecer atributos privados

    constructor() {
        this.#pedidos = [
            //#id           (int)
            //#producto     (String)
            //#cantidad     (int)
            //#estado       (String) - "Pendiente" --> "Confirmado" "Cancelado"
        ];
        this.#nextId = 1;
    }

    // GETTERS
    get id() { return this.#id }
    get producto() { return this.#producto }
    get cantidad() { return this.#cantidad }
    get estado() { return this.#estado }

    // SETTERS
        // Honestamente no creo que estos se utilicen, porque abajo hay métodos que manejan el tratamiento de los datos sieguiendo las reglas de negocio, 
        // pero esto de deja como un método de acceso/modificación a los atributos privados para el desarrollador.
    set id(id) {
        this.#id = id
        return "Id actualizado"
    }
    set producto(producto) {
        this.#producto = producto
        return "Producto actualizado"
    }
    set cantidad(cantidad) {
        this.#cantidad = cantidad
        return "Cantidad actualizada"
    }
    set estado(estado) {
        this.#estado = estado
        return "Estado actualizado"
    }

    // Regresa todos los pedidos
    getAll() { return [...this.#pedidos] }  // Envia una copia
    
    // Regresa los pedidos con estado "pendiente"
    getPendientes() { return [...this.#pedidos.find(pedido => pedido.estado === "pendiente")] }
    
    // Regresa los pedidos con estado "completado"
    getCompletados() { return [...this.#pedidos.find(pedido => pedido.estado === "completado")] }
    
    // Regresa los pedidos con estado "cancelado"
    getCancelados() { return [...this.#pedidos.find(pedido => pedido.estado === "cancelado")] }

    // Busca un elemento por ID
    getById(id) {
        return this.#pedidos.find(pedido => pedido.id === id);
    }

    create(producto, cantidad) {
        /* Reglas de negocio: 
        *   Cantidad: Debe ser mayor a 0.
        *   Estado: Un pedido nuevo siempre inicia en estado “Pendiente” 
        * */

        const newPedido = { 
            id: this.#nextId++, 
            producto, 
            cantidad, 
            estado: "pendiente" 
        };
        this.#pedidos.push(newPedido);
        return newPedido;
    }

    update(id, data) {
        /* Reglas de negocio: 
        *  Un pedido “Pendiente” puede pasar a “Confirmado” o “Cancelado”.
        *  Un pedido “Confirmado” NO puede modificarse
        *  Un pedido “Cancelado” NO puede modificarse
        *  (400 + mensaje claro): Si se intenta una acción inválida
        * */

        const pedido = this.getById(id);

        if (!pedido) { return -1; } // No existe el id

        if (pedido.estado !== "pendiente") { // EL pedido No está en estado "pendiente"
            return -2;
        } 

        pedido.producto = data.producto;
        pedido.cantidad = data.cantidad;
        pedido.estado = data.estado;
        return pedido;
    }

    delete(id) {
        /* Reglas de negocio: 
        *  Solo se pueden eliminar pedidos en estado "pendiente"
        *  (400): Si se intenta eliminar un pedido "confirmado" o "cancelado"
        * */

        const index = this.#pedidos.findIndex(pedido => pedido.id === id);

        if (index !== -1) { // comprueba si existe el elemento
            const estado = this.#pedidos[index].estado

            if (estado === "pendiente") { // comprueba que se pueda eliminar porque está en estado pendiente
                return this.#pedidos.splice(index, 1)[0]; // está como pendiente
            }
            return -2 
        }
        return -1; // no existe el elemento
    }
}

module.exports = { PedidosRepository }