import mongoose from '../config/db.config.js';

const modelName = 'productos';

const productSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    precio: Number,
}, {
    collection: modelName
});

export default function model() {
    if (mongoose.models[modelName]) {
        return mongoose.models[modelName];
    }

    return mongoose.model(modelName, productSchema, modelName);
}