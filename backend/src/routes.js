const express = require('express');
const routes = express.Router();
const OngController = require('./controllers/OngController');
const InController = require('./controllers/IncidentController');
const Profile = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
const { celebrate, Segments, Joi } = require('celebrate');

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.list);

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), OngController.create);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object().keys({
        authorization: Joi.string().required(),
    }).unknown(),
}),
Profile.list);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}) ,InController.list);

routes.post('/incidents', celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required().min(5),
        description: Joi.string().required(),
        value: Joi.number().required()
    }),
    [Segments.HEADERS]: Joi.object().keys({
        authorization: Joi.string().required(),
    }).unknown(),
}), InController.create);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), InController.delete);

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