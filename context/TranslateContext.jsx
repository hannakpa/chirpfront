import { createContext } from "react";
///importar el elemento create Context para crear un contexto para todo el proyecto
///esto es el PROVIDER
//Traductor Context es un nombre inventado. bien puede ser Context.
const TranslateContext = createContext(null);

export default TranslateContext;

//ahora este traductor context se pasa a cada función principal de cada componente en el que quiero que se aplique el TraductorContext de la siguiente forma:
// const Traductor = useContext(TraductorContext)
//y luego en la palabra en un componente hijo que me interese traducir le aplico:
// Traductor.traduce('nombre')
//traduce será una función.
