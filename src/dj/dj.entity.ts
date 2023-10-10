import { ObjectId } from 'mongodb'

export class Dj {
  constructor(
    public nombre: string,
    public instagram: string,
    public tel: number,
    public _id?: ObjectId
  ) {}
}