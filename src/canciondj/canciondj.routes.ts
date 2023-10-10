import { Router } from 'express'
import { sanitizeCanciondjInput, findAll, add} from './canciondj.controler.js'

export const canciondjRouter = Router()

canciondjRouter.get('/', findAll)
//votacionRouter.get('/:id', findOne)
canciondjRouter.post('/', sanitizeCanciondjInput, add)
//votacionRouter.put('/:id', sanitizeDjInput, update)
//votacionRouter.patch('/:id', sanitizeDjInput, update)
//votacionRouter.delete('/:id', remove)