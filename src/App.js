import React from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import GameDetails from "./GameDetails";
import ManagePlayers from "./ManagePlayers";
import RegisterVictory from "./RegisterVictory";
import "./styles.css"; // Importa el archivo CSS

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Registrar Victoria</Link>
            </li>
            <li>
              <Link to="/detalles">Detalles de Partidas</Link>
            </li>
            <li>
              <Link to="/jugadores">Gestionar Jugadores</Link>
            </li>
          </ul>
        </nav>
        <div className="container">
          <Routes>
            <Route path="/" element={<RegisterVictory />} />
            <Route path="/detalles" element={<GameDetails />} />
            <Route path="/jugadores" element={<ManagePlayers />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
