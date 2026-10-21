import React, { useEffect, useState } from 'react'

function RecordarNombre() {
  const [nombre, setNombre] = useState(() => {
    return localStorage.getItem("nombre") ?? "";
  });

  useEffect(() => {
    localStorage.setItem("nombre", nombre);
  }, [nombre]);

  return (
    <section>
      <label htmlFor="nombre">Tu nombre</label>
      <input
        id="nombre"
        value={nombre}
        onChange={(evento) => setNombre(evento.target.value)}
      />
      <p>Hola, {nombre}</p>
    </section>
  );
}

export default RecordarNombre;