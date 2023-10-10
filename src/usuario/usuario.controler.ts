import { Request, Response, NextFunction } from 'express'
import { UsuarioRepository } from './usuario.repository.js'
import { Usuario } from './usuario.entity.js'

const repository = new UsuarioRepository()

function sanitizeUsuarioInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    nombreUsu: req.body.nombreUsu,
    password: req.body.password,
    voto: req.body.voto,
    tipo: req.body.tipo
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
  const usu = await repository.findOne({ id })
  if (!usu) {
    return res.status(404).send({ message: 'Usuario not found' })
  }
  res.json({ data: usu })
}

async function add(req: Request, res: Response) {
  const input = req.body.sanitizedInput

  const usuInput = new Usuario(
    input.nombreUsu,
    input.password,
    input.voto,
    input.tipo
  )

  const usu = await repository.add(usuInput)
  if(!usu){
    return res.status(404).send({ message: 'Usuario already exists' })
  }
  return res.status(201).send({ message: 'Usuario created', data: usu })
}

async function update(req: Request, res: Response) {
  const usu = await repository.update(req.params.id, req.body.sanitizedInput)

  if (!usu) {
    return res.status(404).send({ message: 'Usuario not found' })
  }

  return res.status(200).send({ message: 'Usuario updated successfully', data: usu })
}

async function remove(req: Request, res: Response) {
  const id = req.params.id
  const usu = await repository.delete({ id })

  if (!usu) {
    res.status(404).send({ message: 'Usuario not found' })
  } else {
    res.status(200).send({ message: 'Usuario deleted successfully' })
  }
}

export { sanitizeUsuarioInput, findAll, findOne, add, update, remove }