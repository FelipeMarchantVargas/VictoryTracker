# **VictoryTracker**

VictoryTracker es una página en la que se puede llevar el registro de la cantidad de victorias que se lleva en un determinado juego (o es como se recomienda usar). Se incluye la funcionalidad de gestionar jugadores, ver un historial de las partidas, y obviamente, registrar las victorias.

## **Índice**

- [Instalación](#instalación)
- [Uso](#uso)
- [Contribuciones](#contribuciones)
- [Historial de versiones](#historial-de-versiones)
- [Arquitectura](#arquitectura)
- [Licencia](#licencia)

# **Instalación**

Si bien el proyecto está desplegado, se puede instalar en local.

1. Clona el repositorio (`git clone https://github.com/FelipeMarchantVargas/VictoryTracker.git`).
2. Navega al directorio del proyecto (`cd VictoryTracker`).
3. Instala las dependencias (`npm install`).

# **Uso**

1. Inicia la aplicación (`npm start`).
2. Listo para usar!

# **Contribuciones**

Las contribuciones son bienvenidas. Por favor, sigue los siguientes pasos:
1. Realiza un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/NombreRama`).
3. Realiza tus cambios y haz un commit (`git commit -m 'Añadir nueva funcionalidad'`).
4. Haz push a la rama (`git push origin feature/NombreRama`).
5. Abre un Pull Request.


# **Historial de versiones**

[v1.0.0] - 12/08/2024
- Se lanza la página con las funcionalidades bases, ya descritas anteriormente.

# **Arquitectura**

VictoryTracker es una aplicación web que permite registrar y gestionar las victorias en juegos. La arquitectura está organizada de la siguiente manera:

Frontend (React):

- App.js: Punto de entrada principal de la aplicación. Administra las rutas y la navegación entre componentes.
- ManagePlayers.js: Componente para agregar, editar y eliminar jugadores.
- RegisterVictory.js: Componente donde se registran las victorias de los jugadores.
- GameDetails.js: Muestra el historial de victorias y detalles de las partidas.

Backend (Supabase):

- Supabase: Se utiliza como la base de datos y backend para la gestión de usuarios y partidas.
- API Requests: La aplicación realiza peticiones a Supabase para CRUD de jugadores y victorias.

**Funcionamiento de Cada Componente Principal**

App.js:
Administra la navegación entre las vistas principales. Carga componentes específicos según la URL, garantizando que el flujo de la aplicación sea fluido.

ManagePlayers.js:
Permite a los usuarios agregar nuevos jugadores al sistema, editarlos o eliminarlos. Los datos se almacenan en Supabase y se sincronizan en tiempo real.

RegisterVictory.js:
Aquí se registran las victorias de los jugadores seleccionados. Los datos se envían a la base de datos y se actualizan las estadísticas correspondientes.

GameDetails.js:
Muestra un historial detallado de las partidas jugadas, incluyendo fecha, hora y quién ganó cada partida. Permite a los usuarios revisar el rendimiento de los jugadores a lo largo del tiempo.

# **Licencia**

Este proyecto está licenciado bajo la [MIT License](LICENSE).
