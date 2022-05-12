import React from "react";
import { useState, useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";
import AutenticacionContext from "../../../context/autenticarContext";
import { useContext } from "react";

function Categories(props) {
  let cartas = props.mezcla;
  const { categorias, artDisponibles, necesidades } = useContext(AutenticacionContext);

  function filterByCat(categoria) {
    return cartas.filter((elemento) => elemento.categorias_idCategorias == categoria);
  }

  let categ = categorias.map((nombre, i) => {
    return (
      <div className="catbut" key={i} onclick={filterByCat(nombre.id)}>
        {nombre.nombre}
      </div>
    );
  });

  return (
    <Container fluid>
      <Row className="rowcateg animate__animated animate__fadeIn animate__delay-1s">
        <div className="cat textos" xs={4} md={3} lg={2}>
          {categ}
          <div className="catbut todas">Todas las categorias</div>
          {/* <div className="catbut">Regalos</div>
          <div className="catbut">Necesidades</div> */}
        </div>
      </Row>

      <Row className="rowcateg clascateg">
        <h6>categoria</h6>
      </Row>
    </Container>
  );
}

export default Categories;
