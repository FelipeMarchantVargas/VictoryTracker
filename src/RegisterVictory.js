import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

const RegisterVictory = () => {
  const [jugadores, setJugadores] = useState([]);
  const [selectedJugadorId, setSelectedJugadorId] = useState(""); // Inicializar como cadena vacía
  const [estadisticas, setEstadisticas] = useState([]);

  useEffect(() => {
    fetchJugadores();
    fetchEstadisticas();
  }, []);

  const fetchJugadores = async () => {
    const { data, error } = await supabase.from("Jugadores").select("*");

    if (error) console.log("Error fetching players:", error);
    else setJugadores(data);
  };

  const fetchEstadisticas = async () => {
    // Obtiene la cantidad de veces que cada jugador ha ganado
    const { data, error } = await supabase.rpc("count_wins");

    if (error) console.log("Error fetching statistics:", error);
    else setEstadisticas(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedJugador = jugadores.find(
      (j) => j.id === parseInt(selectedJugadorId)
    );

    if (!selectedJugador) return;

    const jugadorId = selectedJugador.id; // Este es el ID del jugador seleccionado

    const { error: countError, count: victorias } = await supabase
      .from("Juegos")
      .select("id", { count: "exact" })
      .eq("id_ganador", jugadorId); // Filtra por el ID del jugador ganador

    if (countError) {
      console.log("Error counting victories:", countError);
    } else {
      console.log("El jugador ha ganado", victorias + 1, "veces");
    }

    // Obtener la fecha y hora actuales
    const now = new Date();
    const fecha = now.toISOString().split("T")[0]; // YYYY-MM-DD
    const hora = now.toTimeString().split(" ")[0]; // HH:MM:SS

    // Insertar un nuevo juego en la tabla Juegos
    const { error: insertError } = await supabase.from("Juegos").insert([
      {
        id_ganador: selectedJugador.id,
        ganador: selectedJugador.nombre,
        fecha: fecha,
        hora: hora,
      },
    ]);

    if (insertError) {
      console.log("Error processing victory:", insertError);
    } else {
      fetchEstadisticas(); // Actualiza las estadísticas
      setSelectedJugadorId("");
    }
  };

  return (
    <div>
      <h1>Registrar Victoria</h1>
      <form onSubmit={handleSubmit}>
        <select
          value={selectedJugadorId}
          onChange={(e) => setSelectedJugadorId(e.target.value)}>
          <option value="">Selecciona un jugador</option>
          {jugadores.map((jugador) => (
            <option key={jugador.id} value={jugador.id}>
              {jugador.nombre}
            </option>
          ))}
        </select>
        <button type="submit">Registrar</button>
      </form>

      <h2>Estadísticas</h2>
      <ul>
        {estadisticas.map((estadistica) => (
          <li key={estadistica.jugador_id}>
            {estadistica.nombre}: {estadistica.count} victorias
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RegisterVictory;
