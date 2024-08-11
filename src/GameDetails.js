import React, { useCallback, useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

const GameDetails = () => {
  const [victorias, setVictorias] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const victoriasPorPagina = 10; // Puedes ajustar el número de registros por página

  const fetchVictorias = useCallback(async () => {
    // Obtener el total de registros para calcular el número de páginas
    const { count, error: countError } = await supabase
      .from("Juegos")
      .select("id", { count: "exact" });

    if (countError) {
      console.log("Error fetching count:", countError);
      return;
    }

    setTotalPaginas(Math.ceil(count / victoriasPorPagina));

    // Obtener los registros ordenados por fecha y hora, limitados a la página actual
    const { data, error } = await supabase
      .from("Juegos")
      .select("*")
      .order("fecha", { ascending: false })
      .order("hora", { ascending: false })
      .range(
        (pagina - 1) * victoriasPorPagina,
        pagina * victoriasPorPagina - 1
      );

    if (error) {
      console.log("Error fetching data:", error);
    } else {
      setVictorias(data);
    }
  }, [pagina, victoriasPorPagina]);

  useEffect(() => {
    fetchVictorias();
  }, [fetchVictorias]);

  const siguientePagina = () => {
    if (pagina < totalPaginas) setPagina(pagina + 1);
  };

  const paginaAnterior = () => {
    if (pagina > 1) setPagina(pagina - 1);
  };

  return (
    <div>
      <h1>Detalles de Partidas</h1>
      <table>
        <thead>
          <tr>
            <th>Jugador</th>
            <th>Fecha</th>
            <th>Hora</th>
          </tr>
        </thead>
        <tbody>
          {victorias.map((victoria) => (
            <tr key={victoria.id}>
              <td>{victoria.ganador}</td>
              <td>{victoria.fecha}</td>
              <td>{victoria.hora}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={paginaAnterior} disabled={pagina === 1}>
          Página Anterior
        </button>
        <span>
          Página {pagina} de {totalPaginas}
        </span>
        <button onClick={siguientePagina} disabled={pagina === totalPaginas}>
          Siguiente Página
        </button>
      </div>
    </div>
  );
};

export default GameDetails;
