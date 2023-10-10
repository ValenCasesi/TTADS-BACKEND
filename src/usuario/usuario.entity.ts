import { ObjectId } from 'mongodb'

export class Usuario {
  constructor(
    public nombreUsu: string,
    public password: string,
    public voto: boolean,
    public tipo:string,
    public _id?: ObjectId
  ) {}
}