//import { useState } from "react";
import { Tabs, Tab, Container, Row, Col } from "react-bootstrap";
import "../css/nuevo.css";
import NuevaAportacion from "./NuevaAportacion.jsx";
import NuevaNecesidad from "./NuevaNecesidad";

function Nuevo() {
  return (
    <Container>
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <Tabs defaultActiveKey="aportacion" id="uncontrolled-tab-example" className="mb-3 cntr">
            <Tab
              className="pt-3  textos"
              eventKey="aportacion"
              title={
                <h5
                  style={{
                    color: "white",
                    lineHeight: "9px",
                    marginTop: "10px",
                  }}
                >
                  Publicar regalo
                </h5>
              }
            >
              <NuevaAportacion />
            </Tab>
            <Tab
              className="pt-3 textos"
              eventKey="profile"
              title={
                <h5
                  style={{
                    color: "white",
                    lineHeight: "9px",
                    marginTop: "10px",
                  }}
                >
                  Publicar búsqueda
                </h5>
              }
            >
              <NuevaNecesidad />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
}

export default Nuevo;
