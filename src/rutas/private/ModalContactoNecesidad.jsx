import { Modal, Button, Form, OverlayTrigger, Popover } from "react-bootstrap";
import { useState, useEffect } from "react";
import AutenticacionContext from "../../../context/autenticarContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../tools/config";

function ModalContacto({ necesidad }) {
  const { saveToken, datosAutenticado, setShowLogin, showLogin, handleShowLogin, handleCloseLogin } = useContext(AutenticacionContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="btn btn-primary" onClick={saveToken ? handleShow : handleShowLogin}>
        Contacto
      </button>

      <Modal show={show} onHide={handleClose}>
        <Form>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body style={{paddingLeft: "38%"}}>
            <h4  className="titol">Contactar</h4>
          </Modal.Body>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Asunto</Form.Label>
              <Form.Control type="e" placeholder={necesidad.nombre} />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control as="textarea" type="text" maxLength="300" placeholder="Gracias por tu generosidad :D" />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button size="sm" variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button size="sm" type="submit" className="btnResaltar" variant="primary" onClick={handleClose}>
              Contactar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default ModalContacto;
