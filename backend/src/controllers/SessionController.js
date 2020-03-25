const connection = require("../database/connection");

/* "VALIDAÇÃO DE LOGIN" */
module.exports = {
    async create(request, response){
        const { id } = request.body;

        const ong = await connection('ongs')
        .where('id', id)
        .select('name')
        .first();

        if(!ong){
            return response.status(400).json({erros: 'no found ONG´s whit this id'})
        }
        return response.json(ong);
    }
}