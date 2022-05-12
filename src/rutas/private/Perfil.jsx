import React from "react";
import "../css/perfil.css";
import { Container, Row, Badge, Col, Button, ButtonGroup, Image, Card, Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import AutenticacionContext from "../../../context/autenticarContext";
import { useContext, useState, useEffect } from "react";
import { BsTrash } from "react-icons/bs";
import ModEditarAportacion from "./ModEditarAportacion.jsx";
import ModBorrarAportacion from "./ModBorrarAportacion.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL, IMG_ART_URL, IMG_PER_URL, IMG_DIS_URL } from "../../tools/config.js";
import { AiOutlineGift } from "react-icons/ai";
import { HiThumbDown, HiThumbUp, HiLocationMarker } from "react-icons/hi";
////icono shell GiSpiralShell

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

function Perfil() {
  const { datosAutenticado, articulos, necesidades, cargaNecesidades, cargaArticulos } = useContext(AutenticacionContext);
  const [aportacionesUsuario, setAportacionesUsuario] = useState([]);
  const [necesidadesUsuario, setNecesidadesUsuario] = useState([]);
  const [aportacionActual, setAportacionActual] = useState(null);
  const marcado = 0;
  const numAportTotal = aportacionesUsuario.length;
  const [regalosRecibidos, setRegalosRecibidos] = useState([]);
  //const [marcado, setMarcado] = useState(0);

  ////const [aportacionesRegaladas, setAportacionesRegaladas] = useState(0);
  //const [aportacionesTodas, setAportacionesTodas] = useState(aportacionesUsuario);

  const parametros = useParams();
  //const idABuscar = parametros.id;
  //const [porEliminar, setPorEliminar] = useState(null);
  const navigateTo = useNavigate();
  const goOtroPerfil = (id) => {
    navigateTo("/usuario/" + id);
  };

  function filtrarNecPorID() {
    setNecesidadesUsuario(necesidades.filter((elemento) => elemento.Usuario.id == datosAutenticado.id));
  }

  function filtrarArtPorID() {
    setAportacionesUsuario(articulos.filter((elemento) => elemento.Usuario.id == datosAutenticado.id));
  }

  function filtrarDisponibles() {
    setAportacionesUsuario(articulos.filter((elemento) => elemento.Usuario.id == datosAutenticado.id && elemento.receptor_id === null));
  }

  function filtrarRegaladas() {
    setAportacionesUsuario(articulos.filter((elemento) => elemento.Usuario.id == datosAutenticado.id && elemento.receptor_id !== null));
  }
  function filtrarRecibidas() {
    setRegalosRecibidos(articulos.filter((elemento) => elemento.receptor_id == datosAutenticado.id));
  }

  /////    BORRAR LA NECESIDAD //////////////////

  function borrar(idBorrar) {
    const operacion = {
      method: "DELETE",
    };
    fetch(API_URL + "necesidades/" + idBorrar, operacion)
      .then(() => cargaNecesidades())
      .then(() => filtrarNecPorID())
      .catch((error) => console.log(error));
  }

  function marcarRegalado(artElegido) {
    const data = new FormData();
    data.append("receptor_id", marcado);
    const opciones = {
      method: "PUT",
      body: data,
    };

    fetch(API_URL + "articulos/" + artElegido.id, opciones)
      .then((res) => res.json())
      .then((res) => {
        if (res.ok === true) {
          cargaArticulos();
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log("Error: " + err.message));
  }

  useEffect(() => {
    filtrarDisponibles();
    filtrarNecPorID();
    filtrarRecibidas();
  }, [articulos, necesidades]);

  console.log(regalosRecibidos);
  console.log(marcado);
  // useEffect(() => {
  //   cargarNecesidades();
  // }, []);
  console.log(aportacionesUsuario);
  /////////////////////////////////////////

  const renderTooltipEliminar = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <span style={{ fontSize: "1.5rem" }}>Ya no lo necesito</span>
    </Tooltip>
  );
  const renderTooltipRegalo = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <span style={{ fontSize: "1.5rem" }}>Ya lo regalé</span>
    </Tooltip>
  );

  //   const handleDragStart = (e) => e.preventDefault();

  // const items = [
  //   <img src="path-to-img" onDragStart={handleDragStart} role="presentation" />,
  //   <img src="path-to-img" onDragStart={handleDragStart} role="presentation" />,
  //   <img src="path-to-img" onDragStart={handleDragStart} role="presentation" />,
  // ];

  // const Gallery = () => {
  //   return (
  //     <AliceCarousel mouseTracking items={items} />
  //   );
  // }
  const handleDragStart = (e) => e.preventDefault();

  let mostrarNecesidades = necesidadesUsuario.map((carta) => {
    return (
      <div className="cardn_perfil textos" key={carta.id} onDragStart={handleDragStart} role="presentation">
        <Card.Body>
          <Card.Title>{carta.nombre}</Card.Title>
          <Card.Text>{carta.descripcion}</Card.Text>
          <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderTooltipEliminar}>
            <span className="esquina" style={{ cursor: "pointer", fontSize: "1.2rem" }}>
              <BsTrash onClick={() => borrar(carta.id)} />
            </span>
          </OverlayTrigger>
        </Card.Body>
      </div>
    );
  });

  let mostrarAportaciones = aportacionesUsuario.map((carta) => {
    return (
      <tr key={carta.id}>
        <td>
          <Image className={carta.receptor_id === null ? "imgcard" : "imgcard"} style={{ width: "7rem" }} variant="top" src={IMG_ART_URL + carta.foto} />
        </td>
        <td>
          <h5>{carta.nombre}</h5>
          <p>{carta.descripcion}</p>
          {carta.receptor_id !== null ? (
            <>
              <div>
                {carta.receptor_id !== 0 ? (
                  <>
                    <Image onClick={() => goOtroPerfil(carta.receptor_id)} className="fotocanv" src={IMG_PER_URL + carta.receptor.foto} />
                    <span style={{ fontStyle: "oblique" }}>Se lo has regalado a {carta.receptor.nombre}</span>
                  </>
                ) : (
                  <p style={{ fontStyle: "oblique" }}>Lo has regalado fuera de Chirp</p>
                )}
              </div>
            </>
          ) : (
            ""
          )}
        </td>
        <td>{carta.receptor_id === null ? <ModEditarAportacion fila={carta} refresh={filtrarArtPorID} /> : null}</td>
        <td>
          {carta.receptor_id === null ? (
            <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderTooltipRegalo}>
              <i>
                <AiOutlineGift style={{ cursor: "pointer" }} onClick={() => marcarRegalado(carta)} />
              </i>
            </OverlayTrigger>
          ) : null}
        </td>
        <td>{carta.receptor_id === null ? <ModBorrarAportacion fila={carta} refresh={filtrarArtPorID} /> : ""}</td>
      </tr>
    );
  });

  let mostrarRecibidos = regalosRecibidos.map((carta) => {
    return (
      <tr key={carta.id}>
        <td>
          <Image className={carta.receptor_id === null ? "imgcard" : "imgcard"} style={{ width: "7rem" }} variant="top" src={IMG_ART_URL + carta.foto} />
        </td>
        <td>
          <h5>{carta.nombre}</h5>
          <p>{carta.descripcion}</p>
          {carta.receptor_id === datosAutenticado.id ? (
            <>
              <div onClick={() => goOtroPerfil(carta.usuarios_idUsuarios)}>
                <Image className="fotocanv" src={IMG_PER_URL + carta.Usuario.foto} />
                <span style={{ fontStyle: "oblique" }}>Te lo ha regalado {carta.Usuario.nombre}</span>
              </div>
            </>
          ) : (
            ""
          )}
        </td>
      </tr>
    );
  });

  console.log("perfil> ", datosAutenticado);

  return (
    <>
      <Container className="pt-3 textos">
        <Row>
          <Col sm="12" lg="3" className="info-box" style={{ height: "50%" }}>
            <Row className="cntr">
              <Image style={{ width: "60%", margin: "auto" }} className="imgperfil" variant="top" src={IMG_PER_URL + datosAutenticado.foto} />
            </Row>
            <Row className="cntr">
              <h3>
                {datosAutenticado.nombre} {datosAutenticado.apellidos}
              </h3>
              <h3>
                <span style={{ color: "green", fontSize: "1rem" }}>{datosAutenticado.ptospositivos + " "}</span>
                <HiThumbUp />
                <HiThumbDown />
                <span style={{ color: "grey", fontSize: "1rem" }}>{datosAutenticado.ptosnegativos}</span>
              </h3>
            </Row>
            <Row>
              <h5>Sobre mí</h5>
              <p>{datosAutenticado.informacion}</p>
            </Row>
            <Row>
              <div>
                <h6>
                  Encuéntrame en <HiLocationMarker /> {datosAutenticado.distrito.nombre}
                </h6>
                <Image style={{ height: "10rem", textAlign: "center" }} variant="top" src={IMG_DIS_URL + datosAutenticado.distrito.foto} />
              </div>
            </Row>
            <div className="fondo"></div>
          </Col>

          {/* //aqui empieza la columna 2 */}

          <Col className="info-box noshadow">
            {/* //AP "ESTOY BUSCANDO" */}
            <Row>
              <h4>Estoy buscando</h4>
              <hr></hr>
              <div className="contenedorCartas ">{mostrarNecesidades}</div>
            </Row>
            <br />
            <br />

            <Row>
              <Col>
                <h4>Estoy regalando</h4>
                <hr></hr>
                <br />
                <div className="info-box fondoblanco">
                  <Row>
                    <div className="cntr derecha">
                      {/* ANADIRLES UN TOGGLE PARA QUE QUEDE RESALTADO EL BOTON SELECCIONADO. https://react-bootstrap.netlify.app/components/buttons/  */}

                      <ButtonGroup>
                        <div className="numero derecha" style={{ lineHeight: "-10px", marginRight: "10px" }}>
                          <h6>{numAportTotal}</h6>
                        </div>
                        <div onClick={filtrarDisponibles} className="catbut">
                          Disponibles
                          {/* las comento porque no me sale. como siempre estoy haciendo un map de un mismo useState que se va actualizando seg'un los filtros que le aplico, puedo hacer la cuenta de ese mismo array cuya cantidad va cambiando según el filtro que le ponga. no he conseguido la forma en capturar tres diferentes valores con .length */}
                          {/* <Badge bg="info">9</Badge> */}
                          <span className="visually-hidden">Disponibles </span>
                        </div>
                        <div onClick={filtrarRegaladas} className="catbut">
                          He regalado
                          {/* <Badge bg="info">9</Badge> */}
                          <span className="visually-hidden">He regalado</span>
                        </div>
                        <div onClick={filtrarArtPorID} className="catbut" selected>
                          Todos
                          <span className="visually-hidden">Todas las aportaciones</span>
                        </div>
                      </ButtonGroup>
                    </div>
                    <br />
                    <br />
                    <br />
                    {/* ///////DIV CON LAS APORTACIONES////// */}
                  </Row>
                  <Row>
                    {aportacionesUsuario.length ? (
                      <Table hover responsive>
                        <tbody>{mostrarAportaciones}</tbody>
                      </Table>
                    ) : (
                      <h5 style={{ fontStyle: "oblique" }}>No hay regalos</h5>
                    )}
                  </Row>
                </div>
              </Col>
            </Row>
            <br />
            <br />

            <Row>
              <Col>
                <h4>Me han regalado</h4>
                <hr></hr>
                <br />
                <div className="info-box fondoblanco">
                  <Row>
                    {regalosRecibidos.length ? (
                      <Table responsive>
                        <tbody>{mostrarRecibidos}</tbody>
                      </Table>
                    ) : (
                      <h5 style={{ fontStyle: "oblique" }}>No me han regalado nada aún</h5>
                    )}
                  </Row>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Perfil;
