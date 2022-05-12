import { Row, Col, Container, Spinner, Image } from "react-bootstrap";
import ModalContactoNecesidad from "../private/ModalContactoNecesidad";
import "../css/producto.css";
import AutenticacionContext from "../../../context/autenticarContext";
import { useContext, useEffect, useState } from "react";
import { API_URL, IMG_ART_URL, IMG_PER_URL, IMG_DIS_URL } from "../../tools/config.js";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { HiOutlineSearch } from "react-icons/hi";

function Necesidad() {
  const { saveToken, datosAutenticado } = useContext(AutenticacionContext);
  ///para buscar a partir de ID hay que añadir lo siguiente:
  const parametros = useParams();
  const idABuscar = parametros.id; ///aquí defino el idABuscar, que le voy a pasar al parámetro en la ruta main.
  /// al llamar la funcion getArticulo le paso el idABuscar...
  //////////
  const [infoDistrito, setInfoDistrito] = useState(null);

  const [necesidad, setNecesidad] = useState(null);

  const navigateTo = useNavigate();
  const goOtroPerfil = (id) => {
    navigateTo("/usuario/" + id);
  };

  function consultarApi(x) {
    fetch(API_URL + "necesidades/" + x)
      .then((results) => results.json())
      .then((results) => {
        setNecesidad(results.data);
        return results.data.Usuario.distrito_id;
      })
      .then((dId) => fetch(API_URL + "distritos/" + dId)) ////una vez tengo la id, hago la petición con a la API con los datos id que tengo
      .then((results) => results.json())
      .then((results) => setInfoDistrito(results.data)) ////guardo la informaci'on del registro que he obtenido.
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    consultarApi(idABuscar);
  }, []);
  console.log(idABuscar);
  console.log(necesidad);

  if (!necesidad)
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Cargando la necesidad...</span>
      </Spinner>
    );

  return (
    <>
      <Container className="pt-3 textos">
        <Row style={{ position: "relative" }}>
          <Col p-0 md={{ span: 5, offset: 3 }}>
            <div className="tituloProducto info-boxNeed cntr">
              <h5 style={{ marginTop: "8px" }}>{necesidad.nombre}</h5>
            </div>
          </Col>
          <Col md={{ span: 1, offset: 0 }}>
            <div className=" clasSearch tituloProducto info-boxNeed cntr" style={{}}>
              <h5 style={{ marginTop: "8px" }}>
                {" "}
                <HiOutlineSearch />{" "}
              </h5>
            </div>
          </Col>
        </Row>

        <Row style={{ marginTop: "15px" }}>
          <Col md={{ span: 6, offset: 3 }} className="info-boxNeed fondoblanco" style={{ paddingLeft: "30px" }}>
            <Row>
              <Row>
                <Col>
                  <Row>
                    <h5>Descripción</h5>
                    <hr></hr>
                    <p>{necesidad.descripcion}</p>
                    <br />
                    <br />
                    <br />
                  </Row>
                </Col>
                <Col>
                  <Row>
                    <h5>Encuéntra a {necesidad.Usuario.nombre} en </h5>
                    <hr></hr>
                    <h6>{infoDistrito ? infoDistrito.nombre : ""}</h6>
                    <Image style={{ width: "15rem" }} variant="top" src={infoDistrito ? IMG_DIS_URL + infoDistrito.foto : ""} />
                  </Row>
                </Col>
              </Row>
            </Row>
          </Col>
        </Row>

        {necesidad.Usuario.id !== datosAutenticado.id ? (
          <Row style={{ marginTop: "15px" }}>
            <Col md={{ span: 6, offset: 3 }} className="info-boxNeed fondoblanco" style={{ padding: "30px" }}>
              <Row className="info-boxNeed noshadow footer">
                <Col>
                  {" "}
                  {saveToken && necesidad.Usuario.id !== datosAutenticado.id ? (
                    <div className="contactoproducto" onClick={() => goOtroPerfil(necesidad.Usuario.id)}>
                      <Image className="fotocanv" src={IMG_PER_URL + necesidad.Usuario.foto} />
                      <span>{necesidad.Usuario.nombre}</span>
                      <br />
                    </div>
                  ) : (
                    ""
                  )}
                </Col>
                <Col style={{ textAlign: "right" }}>
                  <ModalContactoNecesidad necesidad={necesidad} />
                </Col>
              </Row>
            </Col>
          </Row>
        ) : (
          ""
        )}
      </Container>
    </>
  );
}

export default Necesidad;
