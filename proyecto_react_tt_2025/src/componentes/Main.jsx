import React from "react";
import { Container, Card } from "react-bootstrap";
import { Trash } from "lucide-react";
import Swal from "sweetalert2";
import Button from "./Button";

function Main() {
  return (
    <>
      <main>
        <Container className="Titulo">
          <h1>Tienda Pepe</h1>
        </Container>
        <Container className="cardContainer">
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Container>

        <Button
          texto="Eliminar"
          Icono={Trash}
          onClick={() => {
            Swal.fire({
              title: "Botón presionado",
              icon: "success",
              confirmButtonText: "OK",
            });
          }}
          tooltip="Borrar elemento"
        ></Button>
      </main>
    </>
  );
}

export default Main;
