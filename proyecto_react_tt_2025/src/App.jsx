import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import Header from "./componentes/Header";
import Footer from "./componentes/Footer";
import Cards from "./componentes/Cards";
import Carrito from "./componentes/Carrito";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [carrito, setCarrito] = useState(() => {
    const storedCarrito = localStorage.getItem('carrito');
    return storedCarrito ? JSON.parse(storedCarrito) : [];
  });
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const agregarAlCarrito = (producto) => {
    const existe = carrito.find(item => item.id === producto.id);
    if (existe) {
      setCarrito(carrito.map(item =>
        item.id === producto.id ? { ...existe, cantidad: existe.cantidad + 1 } : item
      ));
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const eliminarDelCarrito = (productoId) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este producto se eliminará del carrito.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        setCarrito(carrito.filter(item => item.id !== productoId));
        Swal.fire(
          'Eliminado',
          'El producto fue eliminado del carrito.',
          'success'
        );
      }
    });
  };

  const toggleCarrito = () => {
    setMostrarCarrito(!mostrarCarrito);
  };

  const cantidadEnCarrito = carrito.reduce((total, item) => total + item.cantidad, 0);

  return (
    <>
      <Header
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        toggleCarrito={toggleCarrito}
        cantidadEnCarrito={cantidadEnCarrito}
      />
      {!mostrarCarrito && (
        <Cards searchTerm={searchTerm} onAgregarAlCarrito={agregarAlCarrito} />
      )}
      {mostrarCarrito && (
        <Carrito
          carrito={carrito}
          onEliminarDelCarrito={eliminarDelCarrito}
          onCerrarCarrito={toggleCarrito} // Pasa toggleCarrito para cerrar el carrito
        />
      )}
      <Footer />
    </>
  );
}

export default App;