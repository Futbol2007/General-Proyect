import React, { useEffect, useState } from "react";

function PersonajeApi() {
  const [personaje, setPersonaje] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargar() {
      try {
        const respuesta = await fetch(
          "https://rickandmortyapi.com/api/character/1",
        );
        if (!respuesta.ok) {
          throw new Error("Error " + respuesta.status);
        }
        const datos = await respuesta.json();
        setPersonaje(datos);
      } catch (e) {
        setError(e.message || "No se pudo cargar el personaje");
      } finally {
        setCargando(false);
      }
    }

    cargar();
  }, []);

  if (cargando) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <article>
      <img src={personaje.image} alt={personaje.name} />
      <h2>{personaje.name}</h2>
      <p>Especie: {personaje.species}</p>
      <p>Estado: {personaje.status}</p>
    </article>
  );
}

export default PersonajeApi;
