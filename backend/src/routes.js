const express = require('express');
const routes = express.Router();
const OngController = require('./controllers/OngController');
const InController = require('./controllers/IncidentController');
const Profile = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.list);
routes.post('/ongs', OngController.create);

routes.get('/profile', Profile.list);

routes.get('/incidents', InController.list);
routes.post('/incidents', InController.create);
routes.delete('/incidents/:id', InController.delete);

module.exports = routes;

/* Métodos HTTP
    GET: Buscar informações
    POST: Cadastrar informações
    PUT: Alterar informações
    DELETE: Deletar informações
*/

/* Tipos de parâmetro
    Query Params: parâmetros nomeados enviados na rota (após sinal de "?"), usado para filtrar uma busca, por exemplo.
    Route Params: paâmetros utilizados para identificar recursos
*/

/* SQL: Relacional (MySql, SqlServer, etc)
   NoSQL: Não relacional (MongoDB, etc)
*/ 