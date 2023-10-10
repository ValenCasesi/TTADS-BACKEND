import { db } from '../shared/db/conn.js';
// pedimos la coleccion de tlos djs en la db y casteamos <Dj> para q traiga una coleccion con objetos Dj de entity.
const canciondjs = db.collection('canciondj');
export class CanciondjRepository {
    // Promise<Dj[] | undefined> --> eso indica que la funcion devuelve una promesa con array de djs o undefined si no encuentra nada.
    async findAll() {
        return await canciondjs.find().toArray(); //lo convierte a array ya que el find devuelve un cursor
    }
    async add(item) {
        const dj = item.dj;
        const cancion = item.cancion;
        const fechaNoche = item.fechaNoche;
        const puntaje = item.puntaje;
        const cancionDjExistente = await canciondjs.findOne({ dj, cancion, fechaNoche, puntaje });
        if (cancionDjExistente) {
            return undefined;
        }
        item._id = (await canciondjs.insertOne(item)).insertedId; //aca buscamos el id del item que se inserta para luego poder mostrarlo. insertedId recupera el id del item
        return item;
    }
}
//# sourceMappingURL=canciondj.repository.js.map