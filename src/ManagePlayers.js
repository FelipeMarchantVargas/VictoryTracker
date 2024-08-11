import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

const ManagePlayers = () => {
  const [nombre, setNombre] = useState("");
  const [jugadores, setJugadores] = useState([]);

  useEffect(() => {
    fetchJugadores();
  }, []);

  const fetchJugadores = async () => {
    // Obtener jugadores y contar sus victorias
    const { data, error } = await supabase
      .from("Jugadores")
      .select("id, nombre");

    if (error) {
      console.log("Error fetching players:", error);
    } else {
      // Para cada jugador, contar el número de victorias en la tabla Juegos
      const jugadoresConVictorias = await Promise.all(
        data.map(async (jugador) => {
          const { count, error: countError } = await supabase
            .from("Juegos")
            .select("id", { count: "exact" })
            .eq("id_ganador", jugador.id);

          if (countError) {
            console.log("Error counting victories:", countError);
            return { ...jugador, victorias: 0 };
          }

          return { ...jugador, victorias: count };
        })
      );

      setJugadores(jugadoresConVictorias);
    }
  };

  const handleAddPlayer = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("Jugadores").insert([{ nombre }]);

    if (error) {
      console.log("Error adding player:", error);
    } else {
      fetchJugadores();
      setNombre("");
    }
  };

  return (
    <div>
      <h1>Gestionar Jugadores</h1>
      <form onSubmit={handleAddPlayer}>
        <input
          type="text"
          placeholder="Nombre del jugador"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <button type="submit">Agregar Jugador</button>
      </form>

      <h2>Lista de Jugadores</h2>
      <ul>
        {jugadores.map((jugador) => (
          <li key={jugador.id}>
            {jugador.nombre}: {jugador.victorias} victorias
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManagePlayers;
