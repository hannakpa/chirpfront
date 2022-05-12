import { Button, Form, Modal, InputGroup } from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import Alertas from "./Alertas";
import AutenticacionContext from "../../context/autenticarContext";

import "./css/modals.css";

////////FUNCION PRINCIPAL//////

function ModalLogin() {
  const { setDatosAutenticado, datosAutenticado, saveToken, setSaveToken, setShowLogin, showLogin, handleCloseLogin, handleShowLogin } = useContext(AutenticacionContext);
  const navigateTo = useNavigate();
  //para MODAL
  //const [show, setShow] = useState(false);

  ///

  const [emailclass, setEmailclass] = useState("");
  const [passclass, setPassclass] = useState("");
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [ok, setOk] = useState(false);
  const [mostrarPass1, setMostrarPass1] = useState(false);
  const abierto = <AiOutlineEye />;
  const cerrado = <AiOutlineEyeInvisible />;
  const [error, setError] = useState("");
  let iconoOjo1 = abierto;

  if (mostrarPass1 === true) {
    iconoOjo1 = cerrado;
  }

  // PARA VERIFICAR ANTES DEL ENVIO DEFAULT DEL FORMULARIO. ESTA FUNCION COMPRUEBA ANTES SI SE CUMPLEN ESTAS CONDICIONES.
  function enviarFormulario(e) {
    e.preventDefault();

    let todoOk = true;

    if (!email.includes("@" && ".")) {
      setEmailclass("is-invalid");
      todoOk = false;
    } else {
      setEmailclass(""); //limpia el mensaje
    }

    if (!pass1) {
      setMensaje("Escriba su contraseña");
      setPassclass("is-invalid");
      todoOk = false;
    } else {
      setMensaje("");
    }

    if (todoOk) {
      setOk(true); ///si todo est'a bien le asignamos true al OK
      try {
        const comprobarAPI = async () => {
          const user = {
            email: email,
            password: pass1,
          };
          const url = "http://localhost:4000/api/usuarios/login";

          fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
          })
            .then((x) => {
              console.log(x);
              return x.json();
            })
            .then((resultado) => {
              console.log(resultado);
              if (!resultado.ok) {
                setError(`Usuario o contraseña incorrecta`);
              } else if (resultado.token) {
                localStorage.setItem("token", resultado.token);
                setDatosAutenticado(resultado);
                setSaveToken(resultado.token);
              }
            })
            .catch((err) => console.log("hay un error"));
        };
        /////ENVIAR A /HOME SOLO SI COINCIDEN CON LOS DATOS DE LA API. AHORA MANDA A CUALQUIERA.
        comprobarAPI();
        console.log(saveToken);
      } catch (error) {
        console.log("hay un error 2");
      }
    }
  }

  //////////////////////////////////////

  ///CON ESTA FUNCION SE ADJUDICA LO QUE SE ESCRIBE EN EL INPUT AL VALOR.
  //PARA QUE VAYA COMPROBANDO SI CUMPLE CON LAS CONDICIONES SE PONE EL IF AQUI. SI QUIERO QUE COMPRUEBE DESPUES, LO PONGO EN FUNCTION ENVIAR FORMULARIO
  function pasoEmail(e) {
    let x = e.target.value;
    setEmail(x);

    if (!x.includes("@" && ".")) {
      setEmailclass("is-invalid");
    } else {
      setEmailclass("");
    }
  }
  function nuevoPass1(e) {
    let x = e.target.value;
    setPass1(x);
  }

  return (
    <>
      {/* ONSUBMIT--FUNCION ENVIAR FORMULARIO. PARA LA ACCION DE ENVIO POR DEFECTO DEL NAVEGADOR Y ANTES QUE NADA COMPRUEBA LOS DATOS REVISANDO LAS CONDICIONES QUE LES DAMOS  */}

      <div className="catbut login" onClick={handleShowLogin}>
        Log in
      </div>

      <Modal show={showLogin} onHide={handleCloseLogin}>
        <Form onSubmit={enviarFormulario}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body style={{paddingLeft: "35%"}}>
            <h4 className="titol">Iniciar sesión</h4>
          </Modal.Body>
          <Modal.Body>
            {/* ////////////////////////////////////////////////////////////////////////////////////////////// */}

            {error ? <Alertas msg={error} /> : null}
            {/* EMAIL */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control className={emailclass} name="email" onInput={pasoEmail} value={email} type="text" placeholder="Escriba su correo electrónico" required />
            </Form.Group>

            {/* PASSWORD 1 */}
            <div>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <InputGroup>
                  <Form.Control style={{ height: "40px" }} type={mostrarPass1 ? "text" : "password"} className={passclass} onInput={nuevoPass1} value={pass1} placeholder="Escriba su contraseña" required></Form.Control>
                  <InputGroup.Text style={{ height: "40px", cursor: "pointer", backgroundColor: "white" }}>
                    <i style={{ position: "relative" }} className="icono" onClick={() => setMostrarPass1(!mostrarPass1)}>
                      {iconoOjo1}
                    </i>
                  </InputGroup.Text>
                  <p className="error">{mensaje}</p>
                </InputGroup>
              </Form.Group>
            </div>

            {/* ////////////////////////////////////////////////////////////////////////// */}
          </Modal.Body>

          <Modal.Footer>
            <Button size="sm" onClick={handleCloseLogin} variant="danger">
              Cancelar
            </Button>
            <Button size="sm">Quiero una cuenta</Button>
            {/* enviar a registro */}
            <Button className="btnResaltar" size="sm" type="submit">
              Inicar sesión
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default ModalLogin;
