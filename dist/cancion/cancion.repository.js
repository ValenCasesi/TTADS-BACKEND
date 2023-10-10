import { db } from '../shared/db/conn.js';
import { ObjectId } from 'mongodb';
// pedimos la coleccion de tlos djs en la db y casteamos <Dj> para q traiga una coleccion con objetos Dj de entity.
const canciones = db.collection('cancion');
export class CancionRepository {
    // Promise<Dj[] | undefined> --> eso indica que la funcion devuelve una promesa con array de djs o undefined si no encuentra nada.
    async findAll() {
        return await canciones.find().toArray(); //lo convierte a array ya que el find devuelve un cursor
    }
    async findOne(item) {
        const _id = new ObjectId(item.id); //aca crea un objetcId que es el id de mongo porque sino no reconoce el id como objectId
        return (await canciones.findOne({ _id })) || undefined; //aca en caso de q no encuentre uno devuelve undefined. si no se agrega el undefined tira error por la def de la promesa.
    }
    async add(item) {
        const nombre = item.nombre;
        const cantante = item.cantante;
        const cancionExistente = await canciones.findOne({ nombre, cantante });
        if (cancionExistente) {
            return undefined;
        }
        item._id = (await canciones.insertOne(item)).insertedId; //aca buscamos el id del item que se inserta para luego poder mostrarlo. insertedId recupera el id del item
        return item;
    }
    async update(id, item) {
        const _id = new ObjectId(id);
        return (await canciones.findOneAndUpdate({ _id }, { $set: item }, { returnDocument: 'after' })) || undefined; //$set guarda todas las modificaciones en el item. returnDoc AFTER devuelve el dj luego del update asi se ven los datos actualizados.
    }
    async delete(item) {
        const _id = new ObjectId(item.id);
        return (await canciones.findOneAndDelete({ _id })) || undefined;
    }
}
//# sourceMappingURL=cancion.repository.js.map