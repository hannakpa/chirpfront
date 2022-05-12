import { Container, Col, Row, Form, Button } from "react-bootstrap";
import ImageUpload from "./ImageUpload.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL, IMG_ART_URL } from "../../tools/config.js";
import AutenticacionContext from "../../../context/autenticarContext";
import { useContext } from "react";

function NuevaAportacion() {
  const { categorias, datosAutenticado, cargaArticulos } =
    useContext(AutenticacionContext);
  const navigateTo = useNavigate();
  const goPerfil = () => {
    navigateTo("/perfil");
  };

  const [fotoSelApor, setFotoSelApor] = useState(null);
  const [nombreSelApor, setNombreSelApor] = useState("");
  const [categoriaSelApor, setCategoriaSelApor] = useState("");
  const [descripcionSelApor, setDescripcionSelApor] = useState("");
  //const receptorId = 0;

  function handleValue(e) {
    setCategoriaSelApor(e.currentTarget.value);
  }

  const submit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("file", fotoSelApor);
    data.append("nombre", nombreSelApor);
    data.append("descripcion", descripcionSelApor);
    data.append("categoria_id", categoriaSelApor);
    data.append("usuario_id", datosAutenticado.id);
    //data.append("receptor_id", receptorId);        /////agregarlo por si falla mucho el numero de receptor ID. esto sirve para enviar por defecto un número. si falla puedes probar con -1, ya que el mysql workbench asigna un 0 automáticamente a un campo vacío. tendria que anadir tambien el const de arriba... mirar el controlador de articulo en la api. el update

    const opciones = {
      method: "POST",
      body: data,
    };

    fetch(API_URL + "articulos", opciones)
      .then((res) => res.json())
      .then((res) => {
        if (res.ok === true) {
          cargaArticulos();
          goPerfil();
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log("Error: " + err.message));
  };

  return (
    <Container className="pt-3 textos">
      <Form
        className="info-box fondoblanco"
        onSubmit={submit}
        encType="multipart/form-data"
      >
        <Row>
          <Col sm="6">
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>
                <h5>¿Qué es?</h5>
              </Form.Label>
              <Form.Control
                size="lg"
                type="text"
                value={nombreSelApor}
                onInput={(e) => setNombreSelApor(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>
                <h5>Breve descripción</h5>
              </Form.Label>
              <Form.Control
                maxLength="300"
                as="textarea"
                type="text"
                value={descripcionSelApor}
                onInput={(e) => setDescripcionSelApor(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>
                <h5>Categoría</h5>
              </Form.Label>
              <Form.Select
                value={categoriaSelApor}
                onChange={(e) => handleValue(e)}
                aria-label="Default select example"
                style={{ display: "inline" }}
              >
                <option>Elegir...</option>
                {categorias.map((opcion, i) => (
                  <option key={i} value={opcion.id}>
                    {opcion.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col sm="6">
            <ImageUpload useFoto={[fotoSelApor, setFotoSelApor]} />
          </Col>
        </Row>
        <Row className="m-4">
          <Button variant="success" onClick={submit}>
            Publicar{" "}
          </Button>
        </Row>
      </Form>
    </Container>
  );
}
export default NuevaAportacion;
