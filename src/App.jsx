//import logo from './logo.svg'
import "./App.css";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import AutenticacionContext from "../context/autenticarContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { API_URL, IMG_ART_URL, IMG_PER_URL, IMG_CAT_URL } from "./tools/config.js";
//rutas

import Welcome from "./rutas/paginaPrincipal/Welcome";
import NavLayout from "./rutas/NavLayout";
import Producto from "./rutas/paginaProducto/Producto";
import Necesidad from "./rutas/paginaNecesidad/Necesidad";

/////////rutas privadas///////////
import Footer from "./rutas/Footer";
import Perfil from "./rutas/private/Perfil";
import OtroPerfil from "./rutas/private/OtroPerfil";
import Nuevo from "./rutas/private/Nuevo";
import Contactos from "./rutas/private/Contactos";
import EditarPerfil from "./rutas/private/EditarPerfil";
import MisIntereses from "./rutas/private/MisIntereses";

function App() {
  const [datosAutenticado, setDatosAutenticado] = useState(null);
  const [saveToken, setSaveToken] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  const [articulos, setArticulos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [necesidades, setNecesidades] = useState([]);
  const [misArtActivos, setMisArtActivos] = useState([]);
  const [msnRecibidos, setMsnRecibidos] = useState([]);
  const [artDisponibles, setArtDisponibles] = useState([]);
  const [distritos, setDistritos] = useState([]);
  const [msnEnviados, setMsnEnviados] = useState([]);

  const cargaArticulos = () => {
    fetch(API_URL + "articulos")
      .then((datos) => datos.json())
      .then((datos) => {
        setArticulos(datos.data);
        return datos.data;
      })
      .then((data) => setArtDisponibles(data.filter((elemento) => elemento.receptor_id === null)))
      .catch((err) => console.log(err));
  };

  const cargaDistritos = () => {
    fetch(API_URL + "distritos")
      .then((datos) => datos.json())
      .then((datos) => setDistritos(datos.data))
      .catch((err) => console.log(err));
  };

  const cargaNecesidades = () => {
    fetch(API_URL + "necesidades")
      .then((datos) => datos.json())
      .then((datos) => setNecesidades(datos.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetch(API_URL + "categorias")
      .then((datos) => datos.json())
      .then((datos) => setCategorias(datos.data))
      .catch((err) => console.log(err));

    cargaNecesidades();
    cargaArticulos();
    cargaDistritos();
  }, []);

  useEffect(() => {
    const tokenAlmacenado = localStorage.getItem("token"); //coger el token que haya en localstorage
    if (tokenAlmacenado) {
      setSaveToken(tokenAlmacenado);
    }
  }, []);

  ///ir a la API  y coger los datos.

  function getMensajes() {
    fetch(API_URL + "intereses/propietario/" + datosAutenticado.id)
      .then((datos) => datos.json())
      .then((datos) => setMsnRecibidos(datos.data))
      .catch((err) => console.log(err));
  }

  function getMsnEnviados() {
    fetch(API_URL + "intereses/interesado/" + datosAutenticado.id)
      .then((datos) => datos.json())
      .then((datos) => setMsnEnviados(datos.data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (articulos.length && datosAutenticado.length) {
      //setMisArtActivos(articulos.filter((elemento) => elemento.Usuario.id === datosAutenticado.id && elemento.receptor_id == null));
      getMensajes();
      getMsnEnviados();
    }
  }, [articulos, datosAutenticado]);

  function cargarDatosAutenticado(newToken) {
    const decoded = jwt_decode(newToken || saveToken);
    setDatosAutenticado(decoded); ////

    localStorage.setItem("token", saveToken);
  }

  useEffect(() => {
    if (saveToken) {
      cargarDatosAutenticado();
    } else {
      setDatosAutenticado("");
    }
  }, [saveToken]);

  function logout() {
    setSaveToken("");
    localStorage.removeItem("token");
    setShowLogin(false);
  }

  console.log(datosAutenticado);
  //console.log(artDisponibles);
  //console.log(msnRecibidos);
  //console.log(msnEnviados);
  return (
    <div>
      <AutenticacionContext.Provider value={{ logout, datosAutenticado, setDatosAutenticado, saveToken, setSaveToken, articulos, categorias, necesidades, cargaArticulos, cargaNecesidades, artDisponibles, misArtActivos, setMisArtActivos, msnRecibidos, getMensajes, handleShowLogin, handleCloseLogin, showLogin, distritos, cargarDatosAutenticado, msnEnviados, getMsnEnviados }}>
        <BrowserRouter>
          <Routes>
            {/* ruta general. el index es lo que se vera por defecto. los path son los que cambiarán */}
            <Route path="/" element={<NavLayout />}>
              <Route index element={<Welcome />} />
              <Route path="producto/:id" element={<Producto />} />
              <Route path="necesidad/:id" element={<Necesidad />} />
              <Route path="usuario/:id" element={<OtroPerfil />} />
              <Route path="perfil" element={<Perfil />} />
              <Route path="nuevo" element={<Nuevo />} />
              <Route path="contactos" element={<Contactos />} />
              <Route path="perfil/edit" element={<EditarPerfil />} />
              <Route path="intereses" element={<MisIntereses />} />
            </Route>
            {/* ruta para usuario. aqu'i en el appu modificar'en su parte fija tambien */}
          </Routes>
        </BrowserRouter>
        {/* <Footer /> */}
      </AutenticacionContext.Provider>
    </div>
  );
}

export default App;
