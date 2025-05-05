// Cards.js
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Card, Container, Button, Row, Col, Spinner, Alert} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Cards({ searchTerm, onAgregarAlCarrito }) { // Recibimos onAgregarAlCarrito como prop
    const [datos, setDatos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [filteredDatos, setFilteredDatos] = useState([]);

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const respuesta = await fetch("https://fakestoreapi.com/products");
                if (!respuesta.ok) {
                    throw new Error("Error en la respuesta del servidor");
                }
                const data = await respuesta.json();
                setDatos(data);
                setCargando(false);
            } catch (err) {
                setError(err.message);
                setCargando(false);
            }
        };

        obtenerDatos();
    }, []);

    useEffect(() => {
        const filtrarProductos = () => {
            if (searchTerm) {
                const textoBusqueda = searchTerm.toLowerCase();
                const resultadosFiltrados = datos.filter(producto =>
                    producto.title.toLowerCase().includes(textoBusqueda) ||
                    producto.description.toLowerCase().includes(textoBusqueda)
                );
                setFilteredDatos(resultadosFiltrados);
            } else {
                setFilteredDatos(datos);
            }
        };

        filtrarProductos();
    }, [searchTerm, datos]);

    const handleComprar = (producto) => {
        Swal.fire({
                      title: "Se ha agregado al Carrito",
                      icon: "success",
                      confirmButtonText: "OK",
                    });
        onAgregarAlCarrito(producto);
    };

    if (cargando) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" role="status" />
                <p>Cargando productos...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">Error: {error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <h1 className="mb-4">Productos</h1>
            <Row>
                {filteredDatos.map((producto) => (
                    <Col key={producto.id} md={4} sm={6} xs={12} className="mb-4 d-flex">
                        <Card className="shadow-sm w-100 d-flex flex-column h-100">
                            <Card.Title style={{ fontSize: "1rem" }}>
                                {producto.title}
                            </Card.Title>
                            <div
                                style={{
                                    height: "250px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: "1rem",
                                }}
                            >
                                <Card.Img
                                    variant="top"
                                    src={producto.image}
                                    alt={producto.title}
                                    style={{
                                        maxHeight: "60%",
                                        maxWidth: "60%",
                                        objectFit: "contain",
                                        backgroundColor: "transparent",
                                    }}
                                />
                            </div>
                            <Card.Body className="d-flex flex-column">
                                <Card.Text className="mt-auto" style={{ fontSize: "0.8rem", flexGrow: 1 }}>
                                    {" "}
                                    {producto.description}
                                </Card.Text>
                                <Card.Text className="mt-auto" >
                                    <strong>Precio:</strong> ${producto.price}
                                </Card.Text>
                                <Button variant="primary" className="mt-2" onClick={() => handleComprar(producto)}>
                                    Comprar
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
                {filteredDatos.length === 0 && !cargando && (
                    <Col xs={12} className="text-center">
                        <Alert variant="info">No se encontraron productos que coincidan con tu búsqueda.</Alert>
                    </Col>
                )}
            </Row>
        </Container>
    );
}

export default Cards;