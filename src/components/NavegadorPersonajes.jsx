import React, { useEffect, useState } from "react";

function NavegadorPersonajes() {
  const [id, setId] = useState(1);
  const [personaje, setPersonaje] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let vigente = true;
    const controlador = new AbortController();

    async function cargar() {
      setCargando(true);
      setError("");

      try {
        const respuesta = await fetch(
          "https://rickandmortyapi.com/api/character/" + id,
          { signal: controlador.signal },
        );
        if (!respuesta.ok) {
          throw new Error("Error " + respuesta.status);
        }
        const datos = await respuesta.json();
        if (vigente) {
          setPersonaje(datos);
        }
      } catch (e) {
        if (vigente) {
          setError(e.message || "No se pudo cargar el personaje");
        }
      } finally {
        if (vigente) {
          setCargando(false);
        }
      }
    }

    cargar();

    return () => {
      vigente = false;
      controlador.abort();
    };
  }, [id]);

  return (
    <section>
      <button onClick={() => setId((anterior) => Math.max(1, anterior - 1))}>
        Anterior
      </button>
      <button onClick={() => setId((anterior) => anterior + 1)}>
        Siguiente
      </button>

      {cargando && <p>Cargando...</p>}
      {!cargando && error && <p>{error}</p>}
      {!cargando && !error && personaje && (
        <article>
          <img src={personaje.image} alt={personaje.name} />
          <h2>{personaje.name}</h2>
          <p>Especie: {personaje.species}</p>
          <p>Estado: {personaje.status}</p>
        </article>
      )}
    </section>
  );
}

export default NavegadorPersonajes;
