import { Container, Col, Row, Form, Button, Image } from "react-bootstrap";
import ImageUpload from "./ImageUpload.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL, IMG_PER_URL } from "../../tools/config.js";
import AutenticacionContext from "../../../context/autenticarContext";
import { useContext } from "react";

function EditarPerfil() {
  const {
    distritos,
    datosAutenticado,
    cargaArticulos,
    cargarDatosAutenticado,
  } = useContext(AutenticacionContext);
  const navigateTo = useNavigate();
  const goPerfil = () => {
    navigateTo("/perfil");
  };

  const [foto, setFoto] = useState(null);
  const [nombres, setNombres] = useState(datosAutenticado.nombre);
  const [apellidos, setApellidos] = useState(datosAutenticado.apellidos);
  const [informacion, setInformacion] = useState(datosAutenticado.informacion);

  const [emailclass, setEmailclass] = useState("");
  const [email, setEmail] = useState(datosAutenticado.email);
  const [telefono, setTelefono] = useState(datosAutenticado.telefono);
  const [miDistrito, setMiDistrito] = useState(datosAutenticado.distrito);

  function handleValue(e) {
    setMiDistrito(e.currentTarget.value);
  }

  function pasoEmail(e) {
    let x = e.target.value;
    setEmail(x);

    if (!x.includes("@" && ".")) {
      setEmailclass("is-invalid");
    } else {
      setEmailclass("");
    }
  }

  const modificaDatos = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("file", foto);
    data.append("nombre", nombres);
    data.append("apellidos", apellidos);
    data.append("email", email);
    data.append("telefono", telefono);
    data.append("informacion", informacion);
    data.append("distrito_id", miDistrito);

    const opciones = {
      method: "PUT",
      body: data,
    };

    fetch(API_URL + "usuarios/" + datosAutenticado.id, opciones)
      .then((res) => res.json())
      .then((res) => {
        if (res.ok === true) {
          cargarDatosAutenticado(res.token);
          goPerfil();
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log("Error: " + err.message));
  };

  // const submit = (e) => {
  //   e.preventDefault();

  //   const data = new FormData();
  //   data.append("file", fotoSelApor);
  //   data.append("nombre", nombreSelApor);
  //   data.append("descripcion", descripcionSelApor);
  //   data.append("categoria_id", categoriaSelApor);
  //   data.append("usuario_id", datosAutenticado.id);
  //   //data.append("receptor_id", receptorId);        /////agregarlo por si falla mucho el numero de receptor ID. esto sirve para enviar por defecto un número. si falla puedes probar con -1, ya que el mysql workbench asigna un 0 automáticamente a un campo vacío. tendria que anadir tambien el const de arriba... mirar el controlador de articulo en la api. el update

  //   const opciones = {
  //     method: "POST",
  //     body: data,
  //   };

  //   fetch(API_URL + "articulos", opciones)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       if (res.ok === true) {
  //         cargaArticulos();
  //         goPerfil();
  //       } else {
  //         console.log(res);
  //       }
  //     })
  //     .catch((err) => console.log("Error: " + err.message));
  // };

  console.log(informacion);

  return (
    <Container className="pt-3 textos">
      <Row style={{ textAlign: "center" }}>
        <Col md={{ span: 6, offset: 2 }}>
          <div className="tituloContacto cntr">
            <h5 style={{ marginTop: "8px" }}>Editar perfil</h5>
          </div>
        </Col>
      </Row>
      <Row style={{ marginTop: "15px" }}>
        <Col
          md={{ span: 8, offset: 2 }}
          className="info-boxContacto fondoblanco"
        >
          <Form onSubmit={modificaDatos} encType="multipart/form-data">
            <Row style={{ textAlign: "right", padding: "30px" }}>
              <Col>
                <Form.Group className="mb-3" controlId="formName">
                  <Row>
                    <Col sm="3">
                      <Form.Label style={{ justifyContent: "right" }}>
                        <h5>Nombres</h5>
                      </Form.Label>
                    </Col>
                    <Col sm="9">
                      <Form.Control
                        size="lg"
                        type="text"
                        value={nombres}
                        onInput={(e) => setNombres(e.target.value)}
                      />
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formName">
                  <Row>
                    <Col sm="3">
                      <Form.Label>
                        <h5>Apellidos</h5>
                      </Form.Label>
                    </Col>
                    <Col sm="9">
                      <Form.Control
                        size="lg"
                        type="text"
                        value={apellidos}
                        onInput={(e) => setApellidos(e.target.value)}
                      />
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Row>
                    <Col sm="3">
                      <Form.Label>
                        <h5>Correo electrónico</h5>
                      </Form.Label>
                    </Col>
                    <Col sm="9">
                      <Form.Control
                        className={emailclass}
                        name="email"
                        onInput={pasoEmail}
                        value={email}
                        type="text"
                      />
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Row>
                    <Col sm="3">
                      <Form.Label>
                        <h5>Número de teléfono (opcional)</h5>
                      </Form.Label>
                    </Col>
                    <Col sm="9">
                      <Form.Control
                        value={telefono}
                        type="text"
                        onInput={(e) => setTelefono(e.target.value)}
                      />
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formName">
                  <Row>
                    <Col sm="3">
                      <Form.Label>
                        <h5>Sobre mí</h5>
                      </Form.Label>
                    </Col>
                    <Col sm="9">
                      <Form.Control
                        maxLength="300"
                        as="textarea"
                        type="text"
                        value={informacion}
                        onInput={(e) => setInformacion(e.target.value)}
                      />
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formName">
                  <Row>
                    <Col sm="3">
                      <Form.Label>
                        <h5>Distrito</h5>
                      </Form.Label>
                    </Col>
                    <Col sm="9">
                      <Form.Select
                        value={miDistrito}
                        onChange={(e) => handleValue(e)}
                        aria-label="Default select example"
                        style={{ display: "inline" }}
                      >
                        <option>Vivo por...</option>
                        {distritos.map((opcion, i) => (
                          <option key={i} value={opcion.id}>
                            {opcion.nombre}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
            </Row>
            {/* ///////SUBIR FOTO////// */}
            <Row className="p-5">
              <Col sm="6">
                <h5>Imagen actual</h5>
                {datosAutenticado.foto ? (
                  <Image
                    className="imgcard"
                    style={{ width: "10rem" }}
                    variant="top"
                    src={" " + IMG_PER_URL + datosAutenticado.foto}
                  />
                ) : (
                  <></>
                )}
              </Col>
              <Col sm="6">
                <ImageUpload useFoto={[foto, setFoto]} />
              </Col>
            </Row>

            <Row className="m-4">
              <Col sm="6">
                <Button variant="secondary" onClick={goPerfil}>
                  Cancelar
                </Button>
              </Col>
              <Col sm="6">
                {" "}
                <Button  variant="success" type="submit">
                  Actualizar mi perfil
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
export default EditarPerfil;
