import { useState, useEffect, useContext } from "react";
import AutenticacionContext from "../../../context/autenticarContext";
import { Button, Modal, Form, Row, Col, Image } from "react-bootstrap";
import { FaPen } from "react-icons/fa";
import { API_URL, IMG_ART_URL, IMG_PER_URL } from "../../tools/config.js";
import ImageUpload from "./ImageUpload.jsx";
import "../css/modals.css";

function ModEditarAportacion(props) {
  const { datosAutenticado, cargaArticulos } = useContext(AutenticacionContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const aportacion = props.fila;
  const [nombre, setNombre] = useState(props.fila.nombre);
  const [descripcion, setDescripcion] = useState(props.fila.descripcion);
  const [foto, setFoto] = useState(null); //props.fila.foto);
  //const [categoria, setCategoria] = useState(props.fila.Categorium.nombre);

  const modificaDatos = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("file", foto);
    data.append("nombre", nombre);
    data.append("descripcion", descripcion);
    data.append("categoria_id", datosAutenticado.id);

    const opciones = {
      method: "PUT",
      body: data,
    };

    fetch(API_URL + "articulos/" + props.fila.id, opciones)
      .then((res) => res.json())
      .then((res) => {
        if (res.ok === true) {
          cargaArticulos();
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log("Error: " + err.message));
  };

  //useEffect(() =>{cargaAlumno()});

  //////////CIERRA LECTURA DE DATOS.... FETCH 1//////////////

  /////ABRE FUNCION PRE-ENVIO...INCLUYE EL FECH 2, QUE ACTUALIZA DATOS.///////

  // function enviaDatos(e) {
  //   e.preventDefault();

  //   ///indico las propiedades y values que se van a ingresar.el nom de la derecha es el que indica el value.
  //   const alumno = {
  //     nom: nom,
  //     email: email,
  //   };
  //   //PREPARAR EL CAMINO PARA EL FETCH DENTRO DE LA FUNCI'ON : url y opciones
  //   ///indicar lo que se le va a enviar
  //   const opciones = {
  //     method: "PATCH",
  //     body: JSON.stringify(alumno), ///pido que convierta a JSON
  //     headers: { "Content-Type": "application/json" }, //indica el formato en que se codifica
  //   };
  //   ///indicar adonde lo quiero subir

  //   ////FETCH 2///
  //   fetch(url, opciones)
  //     //.then(x => x.json()) ///POR QU'E AQU'I TAMBIE'N?? NO SE HABIA CONVERTIDO YA EN OPCIONES?
  //     .then(() => props.refresh())
  //     .catch((error) => console.log(error));
  // }

  return (
    <>
      <span onClick={handleShow}>
        <i>
          <FaPen style={{ cursor: "pointer" }} />
        </i>
      </span>

      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <Modal show={show} onHide={handleClose} className="cuerpomodal" style={{ width: "100%" }}>
            <Form onSubmit={modificaDatos}>
              <Modal.Header closeButton>     
              </Modal.Header>
              <Modal.Body style={{paddingLeft: "33%"}}>
                <h4 className="titol">Modificar datos </h4></Modal.Body>
              <Modal.Body>
                <Form.Group as={Row} className="mb-3" controlId="formNom">
                  <span>
                  <Form.Label column sm="2">
                    Nombre
                  </Form.Label>
                  </span>
                  <Col sm="12">
                    <Form.Control
                      value={nombre}
                      onInput={(e) => setNombre(e.target.value)}
                      type="text"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formEmail">
                  <span>
                  <Form.Label column sm="2">
                    Descripción{" "}
                  </Form.Label>
                  </span>
                  <Col sm="12">
                    <Form.Control
                      value={descripcion}
                      as="textarea"
                      type="text"
                      maxLength="300"
                      onInput={(e) => setDescripcion(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                {/* ///////SUBIR FOTO////// */}
                <Row>
                  <Col sm="7">
                    <ImageUpload useFoto={[foto, setFoto]} />
                  </Col>
                  <Col sm="5">
                    <p>Imagen actual:</p>
                    {aportacion && props.fila.foto ? (
                      <Image
                        className="imgcard"
                        style={{ width: "10rem" }}
                        variant="top"
                        src={IMG_ART_URL + props.fila.foto}
                      />
                    ) : (
                      <></>
                    )}
                  </Col>
                </Row>

                {/* /////CIERRA SUBIR FOTO.//// */}
              </Modal.Body>
              <Modal.Footer>
                <Button size="sm"  onClick={handleClose}>
                  Cancelar
                </Button>
                <Button size="sm" className="btnResaltar" type="submit" onClick={handleClose}>
                  Modificar
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </Col>
      </Row>
    </>
  );
}

export default ModEditarAportacion;
