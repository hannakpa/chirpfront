import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL, IMG_ART_URL } from "../../tools/config";
import AutenticacionContext from "../../../context/autenticarContext";
import { useContext } from "react";

function NuevaNecesidad() {
  const { categorias, datosAutenticado, cargaNecesidades } = useContext(AutenticacionContext);
  const navigateTo = useNavigate();
  const goPerfil = () => {
    navigateTo("/perfil");
  };

  const [nombreSelNec, setNombreSelNec] = useState("");
  const [categoriaSelNec, setCategoriaSelNec] = useState("");
  const [descripcionSelNec, setDescripcionSelNec] = useState("");

  function handleValue(e) {
    setCategoriaSelNec(e.currentTarget.value);
  }

  const submit = (e) => {
    e.preventDefault();

    const opciones = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: nombreSelNec,
        descripcion: descripcionSelNec,
        usuarios_idUsuarios: datosAutenticado.id,
        categorias_id: categoriaSelNec,
      }),
    };

    fetch(API_URL + "necesidades", opciones)
      .then(() => cargaNecesidades())
      .then(() => goPerfil())
      .catch((err) => console.log(err));
  };

  return (
    <Container className="pt-3 textos">
      <Form  className="info-box fondoblanco" onSubmit={submit} encType="multipart/form-data">
      
        <Row >
          <Col >
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>
                <h5>¿Qué necesitas?</h5>
              </Form.Label>
              <Form.Control size="lg" type="text" value={nombreSelNec} onInput={(e) => setNombreSelNec(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>
                <h5>Breve descripción</h5>
              </Form.Label>
              <Form.Control maxLength="300" as="textarea" type="text" value={descripcionSelNec} onInput={(e) => setDescripcionSelNec(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>
                <h5>Categoría</h5>
              </Form.Label>
              <Form.Select value={categoriaSelNec} onChange={(e) => handleValue(e)} aria-label="Default select example" style={{ display: "inline" }}>
                <option>Elegir...</option>
                {categorias.map((opcion, i) => (
                  <option key={i} value={opcion.id}>
                    {opcion.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row className="m-4">
          <Button variant="success" onClick={submit}>
            Publicar
          </Button>
        </Row>
      </Form>
    </Container>
  );
}
export default NuevaNecesidad;
