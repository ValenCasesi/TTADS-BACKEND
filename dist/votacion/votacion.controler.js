import { VotacionRepository } from './votacion.repository.js';
const repository = new VotacionRepository();
function sanitizeVotacionInput(req, res, next) {
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
export { sanitizeVotacionInput, findAll };
//# sourceMappingURL=votacion.controler.js.map