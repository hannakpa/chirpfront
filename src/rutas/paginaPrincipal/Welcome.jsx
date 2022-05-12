// import { useNavigate } from "react-router-dom";

import { Col, Row, Container } from "react-bootstrap";
import background from "../../../uploads/fondo.png";
import "../css/welcome.css";

import Grid from "./Grid.jsx";
import Carrusel from "./Carrusel.jsx";
//import Categories from "./Categories.jsx"; /////Ahora Grid contiene Arriba los botones y las categorias
import Footer from "../Footer.jsx";

function Welcome() {
  return (
    <Container fluid className="basepag">
      <Row>
        {/* <div style={{ backgroundColor: "#fff0ab" }}> */}
        <div style={{ backgroundImage: `url(${background})` }}>
          <Carrusel />
          {/* </div> */}
        </div>
      </Row>
      <Grid />
      <Row>
        <Footer />
      </Row>
    </Container>
  );
}

export default Welcome;
