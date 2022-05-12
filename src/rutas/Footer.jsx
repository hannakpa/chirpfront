import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import { BsTwitter, BsFacebook } from "react-icons/bs";
import { GrInstagram } from "react-icons/gr";
import { Link, Outlet } from "react-router-dom";
import Logo from "../../uploads/logoB.png";

function Footer() {
  return (
    <>
      <Container fluid className="foot textos" style={{ color: "white" }}>
        <Row style={{ height: "200px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Col md={3}>
              <Link to="/">
                <img src={Logo} style={{ height: "75px" }} />
              </Link>
            </Col>
            <Col md={{ span: 3, offset: 6 }}>
              <h2>
                <Link to="/" style={{ color: "white" }}>
                  <GrInstagram />
                </Link>{" "}
                <Link to="/" style={{ color: "white" }}>
                  <BsTwitter />
                </Link>{" "}
                <Link to="/" style={{ color: "white" }}>
                  <BsFacebook />
                </Link>
              </h2>
            </Col>
          </div>
        </Row>
        <Row>
          <Col md={{ span: 2, offset: 3 }}>
            <p>Copyright©2022 Chirp</p>
          </Col>
          <Col md={{ span: 2, offset: 0 }}>
            <Link style={{ color: "white" }} to="/">
              Información legal
            </Link>
          </Col>
          <Col md={{ span: 2, offset: 0 }}>
            <Link style={{ color: "white" }} to="/">
              Política de privacidad
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default Footer;
