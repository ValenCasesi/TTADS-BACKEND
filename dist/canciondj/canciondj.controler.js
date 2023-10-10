import { CanciondjRepository } from './canciondj.repository.js';
import { cancionDj } from './canciondj.entity.js';
const repository = new CanciondjRepository();
function sanitizeCanciondjInput(req, res, next) {
    req.body.sanitizedInput = {
        cancion: req.body.cancion,
        dj: req.body.dj,
        fechaNoche: req.body.fechaNoche,
        puntaje: req.body.puntaje,
    };
    //more checks here
    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    });
    next();
}
async function findAll(req, res) {
    res.json({ data: await repository.findAll() });
}
async function add(req, res) {
    const input = req.body.sanitizedInput;
    const canciondjInput = new cancionDj(input.cancion, input.dj, input.fechaNoche, input.puntaje);
    const cdj = await repository.add(canciondjInput);
    return res.status(201).send({ message: 'Usuario created', data: cdj });
}
export { sanitizeCanciondjInput, findAll, add };
//# sourceMappingURL=canciondj.controler.js.map