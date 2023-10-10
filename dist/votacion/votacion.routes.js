import { Router } from 'express';
import { findAll } from './votacion.controler.js';
export const votacionRouter = Router();
votacionRouter.get('/', findAll);
//# sourceMappingURL=votacion.routes.js.map