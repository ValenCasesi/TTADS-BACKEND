import { Router } from 'express';
import { sanitizeCharacterInput, findAll, findOne, add, update, remove } from '../controller/dj';
export const djRouter = Router();
djRouter.get('/', findAll);
djRouter.get('/:id', findOne);
djRouter.post('/', sanitizeCharacterInput, add);
djRouter.put('/:id', sanitizeCharacterInput, update);
djRouter.patch('/:id', sanitizeCharacterInput, update);
djRouter.delete('/:id', remove);
//# sourceMappingURL=dj.js.map