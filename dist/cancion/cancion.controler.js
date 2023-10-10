import { CancionRepository } from './cancion.repository.js';
import { Cancion } from './cancion.entity.js';
const repository = new CancionRepository();
function sanitizeCancionInput(req, res, next) {
    req.body.sanitizedInput = {
        nombre: req.body.nombre,
        cantante: req.body.cantante,
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
async function findOne(req, res) {
    const id = req.params.id;
    const cancion = await repository.findOne({ id });
    if (!cancion) {
        return res.status(404).send({ message: 'Cancion not found' });
    }
    res.json({ data: cancion });
}
async function add(req, res) {
    const input = req.body.sanitizedInput;
    const cancionInput = new Cancion(input.nombre, input.cantante);
    const cancion = await repository.add(cancionInput);
    if (!cancion) {
        return res.status(404).send({ message: 'Cancion already exists' });
    }
    return res.status(201).send({ message: 'Cancion created', data: cancion });
}
async function update(req, res) {
    const cancion = await repository.update(req.params.id, req.body.sanitizedInput);
    if (!cancion) {
        return res.status(404).send({ message: 'Cancion not found' });
    }
    return res.status(200).send({ message: 'Cancion updated successfully', data: cancion });
}
async function remove(req, res) {
    const id = req.params.id;
    const cancion = await repository.delete({ id });
    if (!cancion) {
        res.status(404).send({ message: 'Cancion not found' });
    }
    else {
        res.status(200).send({ message: 'Cancion deleted successfully' });
    }
}
export { sanitizeCancionInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=cancion.controler.js.map