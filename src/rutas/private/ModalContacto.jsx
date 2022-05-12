import { Modal, Button, Form, OverlayTrigger, Popover } from "react-bootstrap";
import { useState, useEffect } from "react";
import AutenticacionContext from "../../../context/autenticarContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../tools/config";

function ModalContacto({ aportacion }) {
  const { saveToken, datosAutenticado, setShowLogin, showLogin, handleShowLogin, handleCloseLogin } = useContext(AutenticacionContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [mensaje, setMensaje] = useState("");
  //const [articuloId, setArticuloId] = useState("");
  ///// datos del usuario son datosAutenticado.id
  const [asunto, setAsunto] = useState(aportacion.nombre);

  const navigateTo = useNavigate();
  const goHome = () => {
    navigateTo("/");
  };

  const submit = (e) => {
    e.preventDefault();

    const opciones = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mensaje: mensaje,
        articulos_id: aportacion.id,
        usuarios_id: datosAutenticado.id,
        asunto: asunto,
      }),
    };

    fetch(API_URL + "intereses", opciones)
      .then(() => handleClose())
      .then(() => goHome())
      .catch((err) => console.log(err));
  };

  return (
    <>
      <button className="btn btn-primary" onClick={saveToken ? handleShow : handleShowLogin}>
        Contacto
      </button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={submit}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body style={{paddingLeft: "38%"}}>
            <h4 className="titol">Contactar</h4>
          </Modal.Body>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Asunto</Form.Label>
              <Form.Control type="e" placeholder={aportacion.nombre} value={asunto} onInput={(e) => setAsunto(e.target.value)} />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control as="textarea" type="text" value={mensaje} onInput={(e) => setMensaje(e.target.value)} maxLength="300" placeholder={`Convence a ${aportacion.Usuario.nombre} en 300 caracteres :D`} />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button size="sm" variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button size="sm" type="submit" className="btnResaltar" variant="primary">
              Contactar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default ModalContacto;
