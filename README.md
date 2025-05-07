# Votaciones-app
sistema de votaciones. El sistema debe manejar a los votantes y los candidatos, asegurar que cada votante pueda emitir un único voto, y proporcionar estadísticas sobre los resultados de la votación.

##  Instalación y Ejecución Local

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/Lemitssu/Votaciones-app.git
   cd Votaciones-app/app
Instalar dependencias:

bash
npm install
Configurar variables de entorno:
Crea un archivo .env con:

env
CONNECTION_STRING='mongodb://127.0.0.1:27017/crud_bd'
PORT=3000
Iniciar servidores:

Asegúrate de tener MongoDB en ejecución

Inicia la aplicación:

bash
npm start
Acceder:

API: http://localhost:3000

Documentación Swagger: http://localhost:3000/api-docs/

Endpoints Principales
Candidatos
Método	Endpoint	Descripción
POST	/vote/	Insertar candidato
GET	/candidates/getAll	Listar todos
GET	/candidates/getById?id={id}	Buscar por ID
DELETE	/candidates/deleteById?id={id}	Eliminar candidato
Ejemplo POST:

json
{
  "name": "Jose Alberto Suarez",
  "cc": "109283671",
  "party": "Amarillistas"
}
Insertar Candidato

Votantes
Método	Endpoint	Descripción
POST	/voters/insert	Registrar votante
GET	/voters/getAll	Listar todos
GET	/voters/getById?id={id}	Buscar por ID
DELETE	/voters/deleteById?id={id}	Eliminar votante
Votación
Método	Endpoint	Descripción
POST	/vote/	Emitir voto
GET	/vote/getVotes	Ver todos los votos
GET	/vote/getStatistics	Estadísticas electorales
Ejemplo voto:

json
{
  "voter_id": "681bad29b9a4f008bc8e94f2",
  "candidate_id": "681bac71b9a4f008bc8e94e5"
}
Proceso de Votación

 Estadísticas
Estadísticas Electorales

Tecnologías Utilizadas
Node.js

Express

MongoDB

Mongoose

Swagger (Documentación API)
