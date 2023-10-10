import { db } from '../shared/db/conn.js';
// pedimos la coleccion de tlos djs en la db y casteamos <Dj> para q traiga una coleccion con objetos Dj de entity.
const djs = db.collection('votacion');
export class VotacionRepository {
    // Promise<Dj[] | undefined> --> eso indica que la funcion devuelve una promesa con array de djs o undefined si no encuentra nada.
    async findAll() {
        return await djs.find().toArray(); //lo convierte a array ya que el find devuelve un cursor
    }
}
//# sourceMappingURL=votacion.repository.js.map