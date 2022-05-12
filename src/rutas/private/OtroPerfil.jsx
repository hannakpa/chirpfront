import React from "react";
import "../css/perfil.css";
import { Container, Row, Badge, Col, Button, ButtonGroup, Image, Card, Table, OverlayTrigger, Tooltip, Tabs, Tab, Spinner, ListGroup } from "react-bootstrap";
import AutenticacionContext from "../../../context/autenticarContext";
import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL, IMG_ART_URL, IMG_PER_URL, IMG_DIS_URL } from "../../tools/config.js";
import { AiOutlineGift } from "react-icons/ai"; ////icono shell GiSpiralShell
import { HiThumbDown, HiThumbUp, HiLocationMarker } from "react-icons/hi";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

function OtroPerfil() {
  const { datosAutenticado, articulos, necesidades, cargaNecesidades, cargaArticulos } = useContext(AutenticacionContext);
  const [aportacionesUsuario, setAportacionesUsuario] = useState([]);
  const [necesidadesUsuario, setNecesidadesUsuario] = useState([]);
  const [datosUsuario, setDatosUsuario] = useState(null);
  const [regalosRecibidos, setRegalosRecibidos] = useState([]);
  const [regalosEntregados, setRegalosEntregados] = useState([]);

  const navigateTo = useNavigate();
  const goProducto = (id) => {
    navigateTo("/producto/" + id);
  };
  const goOtroPerfil = (id) => {
    navigateTo("/usuario/" + id);
  };

  const parametros = useParams();
  const idABuscar = parametros.id;

  useEffect(() => {
    try {
      const consultarApi = async () => {
        const URL_USER_ID = API_URL + "usuarios/" + idABuscar;

        const respuesta = await fetch(URL_USER_ID);
        const datos = await respuesta.json();
        const user = await datos.data;

        if (user) {
          setDatosUsuario(user);
          setAportacionesUsuario(articulos.filter((elemento) => elemento.Usuario.id === user.id && elemento.receptor_id === null));
          setRegalosEntregados(articulos.filter((elemento) => elemento.Usuario.id === user.id && elemento.receptor_id !== null));
          setRegalosRecibidos(articulos.filter((elemento) => elemento.receptor_id === user.id));
          setNecesidadesUsuario(necesidades.filter((elemento) => elemento.Usuario.id === user.id));
        } else {
          setAportacionesUsuario(null);
          setNecesidadesUsuario(null);
        }
      };

      consultarApi();
    } catch (error) {
      console.log(error);
    }
  }, [idABuscar]);

  if (!datosUsuario)
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Cargando...</span>
      </Spinner>
    );

  console.log(idABuscar);
  console.log(necesidadesUsuario);
  console.log(aportacionesUsuario);
  console.log(datosUsuario.id);

  console.log(regalosEntregados);

  // useEffect(() => {
  //   filtrarAportacionesUsuario();
  //   filtrarNecesidadesUsuario();
  // }, [articulos, necesidades]);

  let mostrarNecesidades = necesidadesUsuario.map((carta) => {
    return (
      <div className="cardn_perfil textos" key={carta.id} style={{ cursor: "pointer" }}>
        <Card.Body>
          <Card.Title>{carta.nombre}</Card.Title>
          <Card.Text>{carta.descripcion}</Card.Text>
        </Card.Body>
      </div>
    );
  });

  //esto es el carrousel de Regalo

  let mostrarAportaciones = aportacionesUsuario.map((carta, i) => {
    return (
      <Col>
        <div style={{ cursor: "pointer" }} onClick={() => goProducto(carta.id)} className="cardRegala" key={i}>
          <Image className="imgcartaCARR" style={{ width: "7rem" }} variant="top" src={IMG_ART_URL + carta.foto} />
          <Card.Body className="card-body textos">
            <h6>{carta.nombre}</h6>
            {/* <h6 className="textos">
            <HiLocationMarker /> distrito
          </h6> */}
          </Card.Body>
        </div>
      </Col>
    );
  });
  ///////   ESE OTRO USUARIO HA REGALADO  ////////

  let mostrarEntregados = regalosEntregados.map((carta, idx) => {
    return (
      <tr key={idx}>
        <td>
          <Image className="imgcard" style={{ width: "7rem" }} variant="top" src={IMG_ART_URL + carta.foto} />
        </td>
        <td>
          <h5>{carta.nombre}</h5>
          <p>{carta.descripcion}</p>
          <hr></hr>
          {/* NO FUNCIONAN LA NAVEGACION DE OTRO PERFIL A OTRO PERFIL DE OTRO USUARIO onClick={() => goOtroPerfil(carta.receptor_id)} */}
          {carta.receptor_id !== 0 ? (
            <>
              <Image onClick={() => goOtroPerfil(carta.receptor_id)} className="fotocanv" src={IMG_PER_URL + carta.receptor.foto} />
              <span style={{ fontStyle: "oblique" }}>Para {carta.receptor.nombre}</span>
            </>
          ) : (
            <p style={{ fontStyle: "oblique" }}>Lo ha regalado fuera de Chirp</p>
          )}
        </td>
      </tr>
    );
  });

  console.log(regalosRecibidos);

  ///////  le han  REGALADO  ////////
  let mostrarRecibidos = regalosRecibidos.map((carta, index) => {
    //////CAMBIAR/////
    return (
      <tr key={index}>
        <td>
          <Image className="imgcard" style={{ width: "7rem" }} variant="top" src={IMG_ART_URL + carta.foto} />
        </td>
        <td>
          <h5>{carta.nombre}</h5>
          <p>{carta.descripcion}</p>
          <hr></hr>
          {/* NO FUNCIONAN LA NAVEGACION DE OTRO PERFIL A OTRO PERFIL DE OTRO USUARIO 
          onClick={() => goOtroPerfil(carta.Usuario.id)} */}
          <Image onClick={() => goOtroPerfil(carta.Usuario.id)} className="fotocanv" src={IMG_PER_URL + carta.Usuario.foto} />
          <span style={{ fontStyle: "oblique" }}>Regalo de {carta.Usuario.nombre}</span>
        </td>
      </tr>
    );
  });

  return (
    <>
      <Container className="pt-3 textos">
        {/* parte de arriba. perfil y necesidades activas y regalos activos */}
        <Row>
          <Col sm="12" lg="3" className="info-box" style={{ height: "50%" }}>
            <Row className="cntr">
              <Image style={{ width: "60%", margin: "auto" }} className="imgperfil" variant="top" src={IMG_PER_URL + datosUsuario.foto} />
            </Row>
            <Row className="cntr">
              <h3>
                {datosUsuario.nombre} {datosUsuario.apellidos}
              </h3>
              <h3>
                <span style={{ color: "green", fontSize: "1rem" }}>{datosUsuario.ptospositivos + " "}</span>
                <HiThumbUp />
                <HiThumbDown />
                <span style={{ color: "grey", fontSize: "1rem" }}>{" " + datosUsuario.ptosnegativos}</span>
              </h3>
            </Row>
            <Row>
              <h5>Sobre mí</h5>
              <p>{datosUsuario.informacion}</p>
            </Row>
            <Row>
              <div>
                <h6>
                  Encuentrame en <HiLocationMarker /> {datosUsuario.Distrito.nombre}
                </h6>
                <Image style={{ height: "10rem", textAlign: "center" }} variant="top" src={IMG_DIS_URL + datosUsuario.Distrito.foto} />
              </div>
            </Row>
            <div className="fondo"></div>
          </Col>

          {/* //aqui empieza la columna 2 */}

          <Col sm="12" lg="8" className="info-box noshadow">
            {/* //AP "ESTOY BUSCANDO" */}
            <Row>
              <h4>Está buscando</h4>
              <hr></hr>
              <div className="contenedorCartas">{mostrarNecesidades}</div>
            </Row>
            <br />
            <br />

            {/* //AP "REGALA" */}
            <Row>
              <h4>Regala</h4>
              <hr></hr>
              <br />
            </Row>

            <Row>
              <div className="contenedorCartas">{mostrarAportaciones}</div>
            </Row>
          </Col>
        </Row>
      </Container>

      <Container className="pt-3 textos">
        <Row p-0>
          {/* /////// CON LAS APORTACIONES////// */}
          <Col sm="12" lg="6">
            {/* /////abre me han regalado/////// */}
            <Row>
              <h4 style={{ textAlign: "center" }}>Ha regalado</h4>
              <hr></hr>
              <br />
              <br />
            </Row>
            <Row className="info-box fondoblanco">
              {regalosEntregados.length ? (
                <Table hover responsive>
                  <tbody>{mostrarEntregados}</tbody>
                </Table>
              ) : (
                <h5 style={{ fontStyle: "oblique", textAlign: "center" }}>No ha regalado nada aún</h5>
              )}

              {/* /////cierra me han regalado/////// */}
            </Row>
          </Col>
          <Col sm="12" lg="6">
            {/* /////abre me han regalado/////// */}
            <Row>
              <h4 style={{ textAlign: "center" }}>Le han regalado</h4>
              <hr></hr>
              <br />
              <br />
            </Row>
            <Row className="info-box fondoblanco">
              {regalosRecibidos.length ? (
                <Table hover responsive>
                  <tbody>{mostrarRecibidos}</tbody>
                </Table>
              ) : (
                <>
                  <h5 style={{ fontStyle: "oblique", textAlign: "center" }}>No le han regalado nada aún</h5>
                  <p style={{ textAlign: "center" }}>¡Hazle un regalo!</p>
                </>
              )}
            </Row>
            {/* /////cierra me han regalado/////// */}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default OtroPerfil;
