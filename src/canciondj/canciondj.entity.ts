import { ObjectId } from 'mongodb'

export class cancionDj {
  constructor(
    public cancion: {
        $ref:"cancion",
        cancionId:ObjectId},
    public dj: {
          $ref:"dj",
          djId:ObjectId},
    public fechaNoche: string,
    public puntaje?: number,
    public _id?: ObjectId,
  ) {}
}