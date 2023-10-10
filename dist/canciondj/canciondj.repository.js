import { db } from '../shared/db/conn.js';
// pedimos la coleccion de tlos djs en la db y casteamos <Dj> para q traiga una coleccion con objetos Dj de entity.
const djs = db.collection('canciondj');
export class CanciondjRepository {
    // Promise<Dj[] | undefined> --> eso indica que la funcion devuelve una promesa con array de djs o undefined si no encuentra nada.
    async findAll() {
        return await djs.find().toArray(); //lo convierte a array ya que el find devuelve un cursor
    }
    async add(item) {
        item._id = (await djs.insertOne(item)).insertedId; //aca buscamos el id del item que se inserta para luego poder mostrarlo. insertedId recupera el id del item
        return item;
    }
}
//# sourceMappingURL=canciondj.repository.js.map