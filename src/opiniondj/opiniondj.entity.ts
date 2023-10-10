import { ObjectId } from 'mongodb'

export class Votacion {
  constructor(
    public _id: ObjectId,
    public djID: ObjectId,
    public opinion: string,
    public usuarioID?: ObjectId
  ) {}
}