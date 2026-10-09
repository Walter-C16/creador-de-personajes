import { useEffect, useState } from 'react';
import Inicio from './components/Inicio';
import FormularioPersonaje from './components/FormularioPersonaje';
import DetallePersonaje from './components/DetallePersonaje';

import {
  obtenerPersonajes,
  guardarPersonaje,
  borrarPersonaje
} from './services/servicioPersonajes';

import './App.css';

function App() {
  const [personajes, setPersonajes] = useState([null, null, null]);
  const [casilleroSeleccionado, setCasilleroSeleccionado] = useState(null);
  const [personajeEnDetalle, setPersonajeEnDetalle] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [procesando, setProcesando] = useState(false);
  const [errorServidor, setErrorServidor] = useState('');

  useEffect(() => {
    let ignorar = false;

    async function cargarPersonajes() {
      try {
        const datos = await obtenerPersonajes();

        if (!ignorar) {
          setPersonajes(datos);
        }
      } catch (error) {
        if (!ignorar) {
          setErrorServidor(error.message);
        }
      } finally {
        if (!ignorar) {
          setCargando(false);
        }
      }
    }

    cargarPersonajes();

    return () => {
      ignorar = true;
    };
  }, []);

  async function crearPersonaje(nuevoPersonaje) {
    if (procesando || casilleroSeleccionado === null) return;

    setProcesando(true);
    setErrorServidor('');

    try {
      const personajeCreado = await guardarPersonaje(
        casilleroSeleccionado,
        nuevoPersonaje
      );

      setPersonajes((anteriores) =>
        anteriores.map((personaje, indice) =>
          indice === casilleroSeleccionado
            ? personajeCreado
            : personaje
        )
      );

      setCasilleroSeleccionado(null);
    } catch (error) {
      setErrorServidor(error.message);
    } finally {
      setProcesando(false);
    }
  }

  async function eliminarPersonaje(indiceEliminar) {
    if (procesando) return;

    setProcesando(true);
    setErrorServidor('');

    try {
      await borrarPersonaje(indiceEliminar);

      setPersonajes((anteriores) =>
        anteriores.map((personaje, indice) =>
          indice === indiceEliminar ? null : personaje
        )
      );
    } catch (error) {
      setErrorServidor(error.message);
    } finally {
      setProcesando(false);
    }
  }

  function seleccionarCasillero(indice) {
    if (personajes[indice] !== null || procesando) return;

    setErrorServidor('');
    setCasilleroSeleccionado(indice);
  }

  function verDetallePersonaje(indice) {
    if (personajes[indice] && !procesando) {
      setPersonajeEnDetalle(indice);
    }
  }


  return (
    <div className="app">
      {errorServidor && (
        <p className="mensaje-error" role="alert">
          {errorServidor}
        </p>
      )}

      {cargando ? (
        <p>Cargando personajes...</p>
      ) : personajeEnDetalle !== null ? (
        <DetallePersonaje
          personaje={personajes[personajeEnDetalle]}
          onVolver={() => setPersonajeEnDetalle(null)}
        />
      ) : casilleroSeleccionado === null ? (
        <Inicio
          personajes={personajes}
          onSeleccionarCasillero={seleccionarCasillero}
          onEliminarPersonaje={eliminarPersonaje}
          onVerDetallePersonaje={verDetallePersonaje}
        />
      ) : (
        <FormularioPersonaje
          onCrear={crearPersonaje}
          onVolver={() => setCasilleroSeleccionado(null)}
          procesando={procesando}
        />
      )}
    </div>
  );
}

export default App;
