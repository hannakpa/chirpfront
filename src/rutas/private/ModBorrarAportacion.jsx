import { useState, useContext } from "react";
import { Button, Modal, Form, ListGroup, Spinner, Image } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { API_URL, IMG_ART_URL, IMG_PER_URL } from "../../tools/config.js";
import AutenticacionContext from "../../../context/autenticarContext";

function ModBorrarAportacion(props) {
  const { cargaArticulos } = useContext(AutenticacionContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const nombre = props.fila.nombre;
  const foto = props.fila.foto;
  const descripcion = props.fila.descripcion;
  const id = props.fila.id;

  // if (!nombre)
  //   return (
  //     <Spinner animation="border" role="status">
  //       <span className="visually-hidden">Loading...</span>
  //     </Spinner>
  //   );

  function borrar(idBorrar) {
    const operacion = {
      method: "DELETE",
    };

    fetch(API_URL + "articulos/" + idBorrar, operacion)
      //.then((x) => x.json())
      //.then(() => props.refresh())
      .then(() => cargaArticulos())
      .then(() => props.refresh())
      .then(() => handleClose())
      .catch((error) => console.log(error));
  }

  return (
    <>
      <span onClick={handleShow}>
        <i>
          <BsTrash style={{ cursor: "pointer" }} />
        </i>
      </span>

      <Modal show={show} onHide={handleClose}>
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>Borrar aportación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4 style={{ color: "red" }}>Esta aportación se eliminará de forma permanente</h4>
            <br />
            <div>
              <ListGroup as="ul">
                <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{nombre}</div>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <p>{descripcion}</p>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <Image className="imgcard" style={{ width: "10rem" }} variant="top" src={IMG_ART_URL + foto} />
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={() => borrar(id)}>
              Eliminar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default ModBorrarAportacion;
