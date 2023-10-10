import { DjRepository } from './dj.repository.js';
import { Dj } from './dj.entity.js';
const repository = new DjRepository();
function sanitizeDjInput(req, res, next) {
    req.body.sanitizedInput = {
        nombre: req.body.nombre,
        instagram: req.body.instagram,
        tel: req.body.tel,
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
    const dj = await repository.findOne({ id });
    if (!dj) {
        return res.status(404).send({ message: 'Dj not found' });
    }
    res.json({ data: dj });
}
async function add(req, res) {
    const input = req.body.sanitizedInput;
    const djInput = new Dj(input.nombre, input.instagram, input.tel);
    const dj = await repository.add(djInput);
    if (!dj) {
        return res.status(404).send({ message: 'Dj already exists' });
    }
    return res.status(201).send({ message: 'Dj created', data: dj });
}
async function update(req, res) {
    const dj = await repository.update(req.params.id, req.body.sanitizedInput);
    if (!dj) {
        return res.status(404).send({ message: 'Dj not found' });
    }
    return res.status(200).send({ message: 'Dj updated successfully', data: dj });
}
async function remove(req, res) {
    const id = req.params.id;
    const dj = await repository.delete({ id });
    if (!dj) {
        res.status(404).send({ message: 'Dj not found' });
    }
    else {
        res.status(200).send({ message: 'Dj deleted successfully' });
    }
}
export { sanitizeDjInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=dj.controler.js.map