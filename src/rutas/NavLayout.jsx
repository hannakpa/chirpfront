//import { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown, Container, Col, Row, Button, NavbarBrand, NavLink, Image, Offcanvas, ButtonGroup } from "react-bootstrap";
import { StickyNav } from "react-js-stickynav";

import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import "./css/navLayout.css";
import { Link, Outlet } from "react-router-dom";
import AutenticacionContext from "../../context/autenticarContext";
import ModalLogin from "./ModalLogin.jsx";
import { HiOutlineCog, HiPlus, HiChat, HiOutlineUser, HiOutlineUsers, HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";
import { IMG_PER_URL } from "../tools/config.js";
import Logo from "/../uploads/logo2.png";

import TranslateContext from "../../context/TranslateContext";

function NavLayout({ name, ...props }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  ////traduccion
  const { traduce, idioma, setIdioma } = useContext(TranslateContext);

  const { saveToken, logout, datosAutenticado } = useContext(AutenticacionContext);

  const navigateTo = useNavigate();

  const goHome = () => {
    navigateTo("/");
  };
  const goPerfil = () => {
    navigateTo("/perfil");
    handleClose();
    cargaArticulos();
  };
  const goNuevo = () => {
    navigateTo("/nuevo");
  };
  const goContactos = () => {
    navigateTo("/contactos");
    handleClose();
  };
  const goEditarPerfil = () => {
    navigateTo("/perfil/edit");
    handleClose();
  };
  const goMisIntereses = () => {
    navigateTo("/intereses");
    handleClose();
  };

  function salir() {
    logout();
    goHome();
  }

  console.log(idioma);
  return (
    <div>
      <Container fluid>
        <Row>
          <StickyNav length="40">
            <Navbar className="nav scrollNav barra animate__animated animate__fadeIn animate__delay-0s">
              <NavbarBrand className="logo">
                <Link to="/">
                  <img src={Logo} style={{ height: "60px" }} />
                </Link>
              </NavbarBrand>
              <Nav>
                <ButtonGroup>
                  <Button onClick={() => setIdioma(0)}>Español</Button>
                  <Button onClick={() => setIdioma(1)}>English</Button>
                  <Button onClick={() => setIdioma(2)}>Русский</Button>
                </ButtonGroup>
              </Nav>

              {!saveToken ? (
                <Nav className=" ms-auto"></Nav>
              ) : (
                <div className=" ms-auto ">
                  &nbsp;
                  <div className="catbut mes" onClick={goNuevo} style={{ fontSize: "1rem", cursor: "pointer" }}>
                    <HiPlus className="ico" />
                  </div>
                  <div className=" saludo ">
                    <div>¡Hola,</div> {datosAutenticado.nombre}!
                  </div>
                </div>
              )}

              <div>
                {!saveToken ? (
                  <ModalLogin />
                ) : (
                  <>
                    <Nav>
                      <img style={{ cursor: "pointer" }} onClick={handleShow} className="img-nav" src={IMG_PER_URL + datosAutenticado.foto}></img>

                      <Offcanvas show={show} placement={"end"} onHide={handleClose} {...props}>
                        <Offcanvas.Header closeButton></Offcanvas.Header>
                        <Offcanvas.Title>
                          <Image className="fotocanvas" src={IMG_PER_URL + datosAutenticado.foto} />
                        </Offcanvas.Title>
                        <Offcanvas.Body>
                          <NavDropdown.Item className="navdrop" onClick={goPerfil}>
                            <HiOutlineUser style={{ stroke: "#FF6455" }} /> {traduce("my_profile")}
                          </NavDropdown.Item>
                          <NavDropdown.Item className="navdrop" onClick={goEditarPerfil}>
                            <HiOutlineCog style={{ stroke: "#FF6455" }} /> {traduce("settings")}
                          </NavDropdown.Item>
                          <br />
                          <div
                            className=""
                            style={{
                              paddingBottom: "10px",
                              borderBottom: "1px solid grey",
                            }}
                          >
                            <HiChat style={{ color: "#FF6455" }} /> {traduce("messages")}
                          </div>
                          <NavDropdown.Item className="navdrop" onClick={goMisIntereses}>
                            <HiArrowNarrowLeft style={{ color: "#FF6455" }} /> {traduce("sent")}
                          </NavDropdown.Item>
                          <NavDropdown.Item className="navdrop" onClick={goContactos}>
                            <HiArrowNarrowRight style={{ color: "#FF6455" }} /> {traduce("received")}
                          </NavDropdown.Item>

                          <br />
                          <NavDropdown.Item onClick={salir}>
                            <div className="catbut">{traduce("log_out")}</div>
                          </NavDropdown.Item>
                        </Offcanvas.Body>
                      </Offcanvas>
                    </Nav>
                  </>
                )}
              </div>
            </Navbar>
          </StickyNav>
        </Row>

        <Row>
          <Col xs="12" md="12">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default NavLayout;
