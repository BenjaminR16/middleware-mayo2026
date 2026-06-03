import mongoose from '../config/db.config.js'

const modelName = 'crud-users'  //nombre de la db 

const userSchema = new mongoose.Schema({
    nombre: String,
    password: String,
    email: {
        type: String,
        unique: true
    }
}, {
    collection: modelName
});

export function model() {
    if (mongoose.models[modelName]) {
        return mongoose.models[modelName];
    }

    return mongoose.model(modelName, userSchema);
}