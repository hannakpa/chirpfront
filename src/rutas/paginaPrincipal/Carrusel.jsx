import { Carousel, Container, Row, Col } from "react-bootstrap";
import React from "react";
import "animate.css";
// import one from './one.png';
// import two from "../two.jpg";
// import three from "../three.jpg";

function Carrusel() {
  //   let url = "https://bit.ly/3vlZcKo";
  return (
    <>
      <Container fluid className="rowlum header p-0 mb-2">
        <h1 className="text titulos" style={{ marginLeft: "40vw", marginRight: "10vw", textAlign: "right", marginTop: "12rem", bottom: "10rem", fontSize: "50px", color: "black", alignSelf: "bottom" }}>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          The more we share,
          <br /> the more we have
        </h1>
      </Container>

      {/* <Container fluid className="rowlum">
        <Row>
          <Col>
            <div className="caixa">
              <h1 className="text">
                don't just take, <br></br>give.
              </h1>
              <div className="head"></div>
            </div>
          </Col>
        </Row>
      </Container> */}

      {/* <Container fluid className="rowlum">
      <Carousel className="container-fluid navfoto">
        <Carousel.Item>
          <div className="div1">
             <img className="d-block" src={url} alt="First slide" />{" "} 
          </div>

          <Carousel.Caption>
            <h1>Take a look!</h1>
            <p>A nuestra sección de muebles</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className="div1 dos">
           <img className="d-block" src={url} alt="First slide" /> 
          </div>
          <Carousel.Caption>
            <h1>Mira nuestrs sección de libros</h1>
            <p>Hay cientos</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className="div1 tres"></div>
        </Carousel.Item>
      </Carousel>
      </Container> */}
    </>
  );
}

export default Carrusel;
