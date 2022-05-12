import React from "react";
import { Card, Row, Image, Col, Container, Spinner } from "react-bootstrap";
import Masonry from "react-masonry-css";
import { API_URL, IMG_ART_URL, IMG_CAT_URL } from "../../tools/config.js";
import AutenticacionContext from "../../../context/autenticarContext";

import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { GrGrow } from "react-icons/gr";
import { HiLocationMarker, HiOutlineSearch, HiOutlineGift } from "react-icons/hi";

function Grid() {
  const { articulos, necesidades, artDisponibles, categorias } = useContext(AutenticacionContext);
  const [mezcla, setMezcla] = useState([]);
  const [catElegida, setCatElegida] = useState(0);

  const navigateTo = useNavigate();
  const goProducto = (id) => {
    navigateTo("/producto/" + id);
  };
  const goNecesidad = (id) => {
    navigateTo("/necesidad/" + id);
  };

  ////a producto le paso la id de la carta.  mirar en la carta.

  const barajar = (id) => {
    if (necesidades.length > 0 && artDisponibles.length > 0) {
      const todo = [...artDisponibles, ...necesidades].sort(() => Math.random() - 0.5).map((cosa) => ({ ...cosa, idx: Math.random() }));
      //////condición que setea la mezcla. Si se ha pasado un id(de categoría), entonces filtrar TODO por esa categoría que se ha pasado desde el botón de categoría. si no se ha pasado ID (como en botón todas las categorías y en el useeffect), entonces que la MEZCLA consista de TODO.
      const condicionFiltro = id ? todo.filter((elemento) => elemento.Categorium.id == id) : todo;
      setMezcla(condicionFiltro);
    }
  };

  useEffect(() => {
    barajar();
  }, [artDisponibles, necesidades]);

  if (!mezcla)
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Cargando...</span>
      </Spinner>
    );

  /////botones categorias

  let categ = categorias.map((nombre, idx) => {
    return (
      <div className="catbut" key={idx} onClick={() => barajar(nombre.id)}>
        {nombre.nombre}
      </div>
    );
  });

  /////mezcla de cartas

  let cartas = mezcla.map((carta, i) => {
    return (
      <div key={i}>
        {carta.foto === undefined ? ( ///si no existe este campo en la tabla es NECESIDAD
          <div onClick={() => goNecesidad(carta.id)} className="cardnec" info={carta} key={carta.id}>
            <Image className="imgcarta" style={{ width: "85%", marginTop: "25px" }} variant="top" src={IMG_CAT_URL + carta.Categorium.icono} />
            <div className="classif busco">
              <h5>
                {" "}
                <HiOutlineSearch style={{ color: "white !important" }} />
              </h5>
            </div>
            <Card.Body>
              <h6>{carta.nombre}</h6>
              <h6 className="textos">
                <HiLocationMarker /> {carta.Usuario.Distrito.nombre}
              </h6>
              {/* <p>{carta.descripcion}</p> */}
            </Card.Body>
          </div>
        ) : (
          <div onClick={() => goProducto(carta.id)} className="card" key={carta.id}>
            <Image className="imgcarta" variant="top" src={IMG_ART_URL + carta.foto} />
            <div className="classif">
              <h5 style={{ textAlign: "center" }}>
                <HiOutlineGift />
              </h5>
            </div>
            <Card.Body>
              <h6>{carta.nombre}</h6>
              <h6 className="textos">
                <HiLocationMarker /> {carta.Usuario.Distrito.nombre}
              </h6>

              {/* <Card.Text>{carta.descripcion}</Card.Text> */}
            </Card.Body>
          </div>
        )}
      </div>
    );
  });

  const myBreakpointsAndCols = { default: 5, 992: 4, 768: 3, 576: 2 };

  return (
    <>
      <Container fluid>
        <Row className="filacat">
          <Row className="rowcateg animate__animated animate__fadeIn animate__delay-1s">
            <div className="cat textos" xs={4} md={3} lg={2}>
              {categ}
              <div className="catbut todas" onClick={() => barajar()}>
                Todas las categorias
              </div>
              {/* <div className="catbut">Regalos</div>
          <div className="catbut">Necesidades</div> */}
            </div>
          </Row>
        </Row>
      </Container>
      <Row>{/* <Row className="rowcateg clascateg">{mezcla[0].Categorium.nombre ? <h6>{mezcla[0].Categorium.nombre}</h6> : ""}</Row> */}</Row>
      <br />
      <Row>
        <Container fluid>
          <Row className="rowlum ">
            <Masonry breakpointCols={myBreakpointsAndCols} className="my-masonry-grid" columnClassName="my-masonry-grid_columna">
              {cartas ? cartas : ""}
            </Masonry>
          </Row>
        </Container>
      </Row>
    </>
  );
}
export default Grid;
