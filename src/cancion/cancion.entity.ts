import { ObjectId } from 'mongodb'

export class Cancion {
  constructor(
    public nombre: string,
    public cantante: string,
    public _id?: ObjectId
  ) {}
}