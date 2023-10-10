import { Repository } from '../shared/repository.js'
import { cancionDj } from './canciondj.entity.js'
import { db } from '../shared/db/conn.js'
import { ObjectId } from 'mongodb'

// pedimos la coleccion de tlos djs en la db y casteamos <Dj> para q traiga una coleccion con objetos Dj de entity.
const djs = db.collection<cancionDj>('canciondj')

export class CanciondjRepository {
  // Promise<Dj[] | undefined> --> eso indica que la funcion devuelve una promesa con array de djs o undefined si no encuentra nada.
  public async findAll(): Promise<cancionDj[] | undefined> {
    return await djs.find().toArray()//lo convierte a array ya que el find devuelve un cursor
  }

  public async add(item: cancionDj): Promise<cancionDj | undefined> {

    item._id = (await djs.insertOne(item)).insertedId //aca buscamos el id del item que se inserta para luego poder mostrarlo. insertedId recupera el id del item
    return item
  }

}


