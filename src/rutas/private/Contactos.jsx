import {
  Container,
  Col,
  Row,
  Form,
  Button,
  Tabs,
  Image,
  Card,
  OverlayTrigger,
  Tooltip,
  Spinner,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL, IMG_ART_URL, IMG_PER_URL } from "../../tools/config";
import AutenticacionContext from "../../../context/autenticarContext";
import { useContext } from "react";
import "../css/contactos.css"; ///poner algo de onselect para que cambie de color cuando se le clica
import { useParams } from "react-router-dom";
import { AiOutlineGift } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";

function Contactos() {
  const {
    saveToken,
    datosAutenticado,
    articulos,
    cargaArticulos,
    msnRecibidos,
    getMensajes,
  } = useContext(AutenticacionContext);
  //const [msnArtSelec, setMsnArtSelec] = useState([]); //// mensajes del articulo seleccionado

  ///para los iconos
  //const [showRegalo, setShowRegalo] = useState(true);
  const navigateTo = useNavigate();
  //console.log(msnRecibidos); /////DEBERIA TENER ALGO ///mensajes para el id autenticado

  const goOtroPerfil = (id) => {
    navigateTo("/usuario/" + id);
  };

  if (!msnRecibidos)
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Cargando mensajes...</span>
      </Spinner>
    );

  useEffect(() => {
    getMensajes();
  }, []);

  /////    BORRAR EL MENSAJE //////////////////

  function borrar(idBorrar) {
    const operacion = {
      method: "DELETE",
    };
    fetch(API_URL + "intereses/" + idBorrar, operacion)
      .then(() => getMensajes())
      .catch((error) => console.log(error));
  }

  //////////////////////////    REGALAR ART'ICULO...

  function marcarRegalado(msnElegido) {
    const data = new FormData();
    data.append("receptor_id", msnElegido.usuarios_id);
    const opciones = {
      method: "PUT",
      body: data,
    };

    fetch(API_URL + "articulos/" + msnElegido.articulos_id, opciones)
      .then((res) => res.json())
      .then((res) => {
        if (res.ok === true) {
          getMensajes();
          cargaArticulos();
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log("Error: " + err.message));
  }

  function ShowRegalo({ item }) {
    return (
      <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltipRegalo}
      >
        <i>
          <AiOutlineGift
            style={{ cursor: "pointer", fontSize: "1.7rem" }}
            onClick={() => marcarRegalado(item)}
          />
        </i>
      </OverlayTrigger>
    );
  }

  /////FUNCIONES PARA LOS ICONOS CON OVERLAY.

  const renderTooltipRegalo = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <span style={{ fontSize: "1.5rem" }}>¡Te lo regalo!</span>
    </Tooltip>
  );

  const renderTooltipEliminar = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <span style={{ fontSize: "1.5rem" }}>Borrar mensaje</span>
    </Tooltip>
  );

  const formateaFecha = (fechaStr) => {
    let f = new Date(fechaStr);
    let dia = f.getDate();
    let mes = f.getMonth() + 1;
    let anyo = f.getFullYear();
    let hora = f.getHours();
    let min = String(f.getMinutes()).padStart(2, "0");
    return hora + ":" + min + "  " + dia + "/" + mes + "/" + anyo;
  };
  //console.log(artActivos);

  console.log(msnRecibidos); /////DEBERIA TENER ALGO ///mensajes para el id autenticado

  //////QUITARLE EL CURSOR POINTER DE TODA LA CARTA. QUE LO TENGAN SOLO LOS BOTONES PARA VER EL PERFIL Y EL DE REGALO
  let mostrarMensajes = msnRecibidos.map((item, i) => (
    <Row style={{ marginTop: "15px" }} key={i}>
      {/* src={IMG_ART_URL + carta.foto} */}
      <Col md={{ span: 8, offset: 2 }} className="info-boxContacto fondoblanco">
        <Row style={{ height: "100%" }}>
          <Col
            md={{ span: 3, offset: 0 }}
            style={{ paddingLeft: "20px", margin: "auto" }}
          >
            <Image
              src={IMG_ART_URL + item.Articulo.foto}
              variant="top"
              style={{ width: "9rem", borderRadius: "10px" }}
            />
          </Col>
          <Col>
            <Row style={{ position: "relative" }}>
              <Row>
                <p style={{ textAlign: "right", color: "grey" }}>
                  {formateaFecha(item.fecha)}
                </p>
                <Card.Title>{item.asunto}</Card.Title>
                <Card.Text>{item.mensaje}</Card.Text>
                <hr></hr>
              </Row>
              <Row>
                <div className="imagenContacto">
                  <span style={{ fontStyle: "oblique" }}>
                    {item.Usuario.nombre} ha solicitado tu regalo.
                  </span>
                  <Image
                    onClick={() => goOtroPerfil(item.usuarios_id)}
                    className="fotocanv"
                    src={IMG_PER_URL + item.Usuario.foto}
                  />
                </div>
              </Row>
            </Row>
          </Col>

          <Col
            md={{ span: 2, offset: 0 }}

          >
            {item.Articulo.receptor_id === null ? (
              <>
                <ShowRegalo item={item} />{" "}
              </>
            ) : (
              ""
            )}

            {item.Articulo.receptor_id === item.Usuario.id ? (
              <>
                <h5 style={{textAlign: "center"}}> Regalado a {item.Usuario.nombre} ¡Gracias! </h5>
               
              </>
            ) : (
              ""
            )}
            {item.Articulo.receptor_id !== item.Usuario.id ? (
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltipEliminar}
              >
                <span
                  style={{
                    cursor: "pointer",
                    marginLeft: "1rem",
                    fontSize: "1.5rem",
                  }}
                >
                  <BsTrash onClick={() => borrar(item.id)} />
                </span>
              </OverlayTrigger>
            ) : (
              ""
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  ));

  return (
    <Container className="pt-3 textos">
      <Row style={{ textAlign: "center" }}>
        <Col md={{ span: 6, offset: 2 }}>
          <div className="tituloContacto cntr">
            <h5 style={{ marginTop: "8px" }}>Mensajes recibidos</h5>
          </div>
        </Col>
      </Row>

      {msnRecibidos ? mostrarMensajes : ""}
    </Container>
  );
}

export default Contactos;
