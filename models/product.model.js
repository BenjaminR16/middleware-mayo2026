import mongoose from '../config/db.config.js';

const modelName = 'crud-products';

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
}, {
    collection: modelName
});

export function model() {
    if (mongoose.models[modelName]) {
        return mongoose.models[modelName];
    }

    return mongoose.model(modelName, productSchema);
}