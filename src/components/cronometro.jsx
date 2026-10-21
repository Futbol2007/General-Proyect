import React, { useEffect, useState } from 'react'

function Cronometro() {
  const [segundos, setSegundos] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSegundos((anterior) => anterior + 1);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return <p>Segundos: {segundos}</p>;
}

export default Cronometro;