// Header.js
import React from "react";
import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header({ searchTerm, onSearchChange, toggleCarrito, cantidadEnCarrito }) {
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg">
      <Container>
        {/* Logo de la empresa */}
        <Navbar.Brand href="#home">
                        <img
                            alt="Logo"
                            src="/logo.png" // Cambia esta ruta por la de tu logo
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        MiEmpresa
                    </Navbar.Brand>

                    {/* Menú principal */}
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#about">Sobre nosotros</Nav.Link>
                    </Nav>

        {/* Buscador, botón de administrador y carrito */}
        <Form className="d-flex align-items-center">
          <FormControl
            type="search"
            placeholder="Buscar"
            className="me-2"
            aria-label="Buscar"
            value={searchTerm}
            onChange={onSearchChange}
          />
          <Button variant="outline-light" className="me-2">
            <FaSearch />
          </Button>
          <Button variant="light" href="#admin" className="me-2">
            Administrador
          </Button>
          <Button variant="outline-light" onClick={toggleCarrito} style={{ position: 'relative' }}>
            <FaShoppingCart />
            {cantidadEnCarrito > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  backgroundColor: 'red',
                  color: 'white',
                  borderRadius: '50%',
                  padding: '2px 6px',
                  fontSize: '0.8em',
                }}
              >
                {cantidadEnCarrito}
              </span>
            )}
          </Button>
        </Form>
      </Container>
    </Navbar>
  );
}

export default Header;