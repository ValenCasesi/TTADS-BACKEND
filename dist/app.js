import express from 'express';
import { djRouter } from './dj/dj.routes.js';
import { cancionRouter } from './cancion/cancion.routes.js';
import { usuarioRouter } from './usuario/usuario.routes.js';
import { canciondjRouter } from './canciondj/canciondj.routes.js';
const app = express();
app.use(express.json());
app.use('/api/djs', djRouter);
app.use('/api/canciones', cancionRouter);
app.use('/api/usuarios', usuarioRouter);
app.use('/api/canciondj', canciondjRouter);
app.use((_, res) => {
    return res.status(404).send({ message: 'Resource not found' });
});
app.listen(3000, () => {
    console.log('Server runnning on http://localhost:3000/');
});
//# sourceMappingURL=app.js.map