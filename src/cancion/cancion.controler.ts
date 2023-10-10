import { Request, Response, NextFunction } from 'express'
import { CancionRepository } from './cancion.repository.js'
import { Cancion } from './cancion.entity.js'

const repository = new CancionRepository()

function sanitizeCancionInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    nombre: req.body.nombre,
    cantante: req.body.cantante,
  }
  //more checks here

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })
  next()
}

async function findAll(req: Request, res: Response) {
  res.json({ data: await repository.findAll() })
}

async function findOne(req: Request, res: Response) {
  const id = req.params.id
  const cancion = await repository.findOne({ id })
  if (!cancion) {
    return res.status(404).send({ message: 'Cancion not found' })
  }
  res.json({ data: cancion })
}

async function add(req: Request, res: Response) {
  const input = req.body.sanitizedInput

  const cancionInput = new Cancion(
    input.nombre,
    input.cantante
  )
  const cancion = await repository.add(cancionInput)
  if(!cancion){
    return res.status(404).send({ message: 'Cancion already exists' })
  }
  return res.status(201).send({ message: 'Cancion created', data: cancion })
}

async function update(req: Request, res: Response) {
  const cancion = await repository.update(req.params.id, req.body.sanitizedInput)
  if (!cancion) {
    return res.status(404).send({ message: 'Cancion not found' })
  }
  return res.status(200).send({ message: 'Cancion updated successfully', data: cancion })
}

async function remove(req: Request, res: Response) {
  const id = req.params.id
  const cancion = await repository.delete({ id })

  if (!cancion) {
    res.status(404).send({ message: 'Cancion not found' })
  } else {
    res.status(200).send({ message: 'Cancion deleted successfully' })
  }
}

export { sanitizeCancionInput, findAll, findOne, add, update, remove }