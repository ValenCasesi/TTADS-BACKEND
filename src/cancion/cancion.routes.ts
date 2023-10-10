import { Router } from 'express'
import { sanitizeCancionInput, findAll, findOne, add, update, remove } from './cancion.controler.js'

export const cancionRouter = Router()

cancionRouter.get('/', findAll)
cancionRouter.get('/:id', findOne)
cancionRouter.post('/', sanitizeCancionInput, add)
cancionRouter.put('/:id', sanitizeCancionInput, update)
cancionRouter.patch('/:id', sanitizeCancionInput, update)
cancionRouter.delete('/:id', remove)