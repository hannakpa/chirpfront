import { Row, Col, Container, Image, Spinner } from "react-bootstrap";
import ModalContacto from "../private/ModalContacto";
import "../css/producto.css";
import AutenticacionContext from "../../../context/autenticarContext";
import { useContext, useEffect, useState } from "react";
import {
  API_URL,
  IMG_ART_URL,
  IMG_PER_URL,
  IMG_DIS_URL,
} from "../../tools/config.js";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { HiOutlineGift } from "react-icons/hi";
import Footer from "../Footer.jsx";

function Producto() {
  const { saveToken, datosAutenticado } = useContext(AutenticacionContext);
  ///para buscar a partir de ID hay que añadir lo siguiente:
  const parametros = useParams();
  const idABuscar = parametros.id; ///aquí defino el idABuscar, que le voy a pasar al parámetro en la ruta main.
  const [infoDistrito, setInfoDistrito] = useState(null); ///de la BD distritos
  //const [distritoId, setDistritoId] = useState(null);
  /// al llamar la funcion getArticulo le paso el idABuscar...
  //////////
  const [aportacion, setAportacion] = useState(null);
  const navigateTo = useNavigate();
  const goOtroPerfil = (id) => {
    navigateTo("/usuario/" + id);
  };

  ////Fetch dentro de un then dentro de un fetch.
  function consultarApi() {
    ////función que accede a la base de datos (a las dos tablas)
    fetch(API_URL + "articulos/" + idABuscar) ///busca en la api el artículo con la id que le acabo de pasar
      .then((results) => results.json())
      .then((results) => {
        ///aquí hago el set de la aportación
        setAportacion(results.data);
        return results.data.Usuario.distrito_id; /////devuelvo los datos del campo que escojo para pasarsela al siguiente then.
      })
      .then((dId) => fetch(API_URL + "distritos/" + dId)) ////una vez tengo la id, hago la petición con a la API con los datos id que tengo
      .then((results) => results.json())
      .then((results) => setInfoDistrito(results.data)) ////guardo la informaci'on del registro que he obtenido.
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    consultarApi();
  }, []);

  console.log(idABuscar);
  console.log("aportacio", aportacion);

  console.log(infoDistrito);

  if (!aportacion)
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Cargando...</span>
      </Spinner>
    );

  return (
    <>
      <Container className="pt-3 textos">
        {/* //ap titulo */}
        <Row>
          <Col md={{ span: 6, offset: 2 }}>
            <div className="tituloProducto info-boxNeed cntr">
              <h5 style={{ marginTop: "8px" }}>{aportacion.nombre}</h5>
            </div>
          </Col>
          <Col md={{ span: 1, offset: 1 }}>
            <div
              className="clasGift tituloProducto info-boxNeed cntr"
              style={{ margin: "right" }}
            >
              <h5 style={{ marginTop: "8px", right: "20px !important" }}>
                {" "}
                <HiOutlineGift />{" "}
              </h5>
            </div>
          </Col>
        </Row>

        <Row style={{ marginTop: "15px" }}>
          {/* //ap info */}
          <Col md={{ span: 8, offset: 2 }} className="info-boxNeed fondoblanco">
            <Row style={{ height: "100%" }}>
              <Col md={{ span: 3, offset: 0 }} style={{ paddingLeft: "10px" }}>
                <Image
                  src={IMG_ART_URL + aportacion.foto}
                  variant="top"
                  style={{ width: "100%", borderRadius: "10px" }}
                />
              </Col>
              <Col>
                <Row>
                  <h5>Descripción</h5>
                  <hr></hr>
                  <p>{aportacion.descripcion}</p>
                  <br />
                  <br />
                  <br />
                </Row>
              </Col>
              <Col>
                <Row>
                  <h5>Encuéntra a {aportacion.Usuario.nombre} en </h5>
                  <hr></hr>
                  <h6>{infoDistrito ? infoDistrito.nombre : ""}</h6>
                  <Image
                    style={{ width: "15rem" }}
                    variant="top"
                    src={infoDistrito ? IMG_DIS_URL + infoDistrito.foto : ""}
                  />
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>

        {aportacion.Usuario.id !== datosAutenticado.id ? (
          <Row style={{ marginTop: "15px" }}>
            <Col
              md={{ span: 8, offset: 2 }}
              className="info-boxNeed fondoblanco"
              style={{ padding: "30px" }}
            >
              <Row className="info-boxNeed noshadow footer">
                <Col>
                  {saveToken &&
                  aportacion.Usuario.id !== datosAutenticado.id ? (
                    <div
                      className="contactoproducto"
                      onClick={() => goOtroPerfil(aportacion.Usuario.id)}
                    >
                      <Image
                        className="fotocanv"
                        src={IMG_PER_URL + aportacion.Usuario.foto}
                      />
                      <span>{" "}{aportacion.Usuario.nombre}</span>
                      <br />
                    </div>
                  ) : (
                    ""
                  )}
                </Col>
                <Col style={{ textAlign: "right" }}>
                  <ModalContacto aportacion={aportacion} />
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

export default Producto;
