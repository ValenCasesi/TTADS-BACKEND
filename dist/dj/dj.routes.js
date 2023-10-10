import { Router } from 'express';
import { sanitizeDjInput, findAll, findOne, add, update, remove } from './dj.controler.js';
export const djRouter = Router();
djRouter.get('/', findAll);
djRouter.get('/:id', findOne);
djRouter.post('/', sanitizeDjInput, add);
djRouter.put('/:id', sanitizeDjInput, update);
djRouter.patch('/:id', sanitizeDjInput, update);
djRouter.delete('/:id', remove);
//# sourceMappingURL=dj.routes.js.map