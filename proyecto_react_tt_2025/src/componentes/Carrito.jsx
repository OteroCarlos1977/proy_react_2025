// Carrito.js
import React from 'react';
import Swal from "sweetalert2";
import { Container, ListGroup, Button } from 'react-bootstrap';

function Carrito({ carrito, onEliminarDelCarrito, onCerrarCarrito }) {
    if (carrito.length === 0) {
        return (
            <Container className="mt-4">
                <h2>Carrito de Compras</h2>
                <p>Tu carrito está vacío.</p>
                <Button variant="secondary" className="mt-3" onClick={onCerrarCarrito}>
                    Volver a la Tienda
                </Button>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <h2>Carrito de Compras</h2>
            <ListGroup>
                {carrito.map(item => (
                    <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
                        <div>
                            {item.title} - Cantidad: {item.cantidad} - Precio: ${item.price * item.cantidad}
                        </div>
                        <Button variant="danger" size="sm" onClick={() => onEliminarDelCarrito(item.id)}>
                            Eliminar
                        </Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <div className="mt-3">
                <strong>Total: ${carrito.reduce((total, item) => total + item.price * item.cantidad, 0).toFixed(2)}</strong>
            </div>
            <div className="mt-3 d-flex justify-content-between">
                <Button variant="success">Finalizar Compra</Button>
                <Button variant="secondary" onClick={onCerrarCarrito}>
                    Seguir Comprando
                </Button>
            </div>
        </Container>
    );
}

export default Carrito;