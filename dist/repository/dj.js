import { db } from '../shared/db/conn.js';
import { ObjectId } from 'mongodb';
const djs = db.collection('djs');
export class DjRepository {
    async findAll() {
        return await djs.find().toArray();
    }
    async findOne(item) {
        const _id = new ObjectId(item.id);
        return (await djs.findOne({ _id })) || undefined;
    }
    async add(item) {
        item._id = (await djs.insertOne(item)).insertedId;
        return item;
    }
    async update(id, item) {
        const _id = new ObjectId(id);
        return (await djs.findOneAndUpdate({ _id }, { $set: item }, { returnDocument: 'after' })) || undefined;
    }
    async delete(item) {
        const _id = new ObjectId(item.id);
        return (await djs.findOneAndDelete({ _id })) || undefined;
    }
}
//# sourceMappingURL=dj.js.map