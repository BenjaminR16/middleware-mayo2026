import mongoose from "mongoose";

mongoose.connect('mongodb+srv://brcj16_db_user:TNFnW8qTKLAAmyla@cluster0.pgryizu.mongodb.net/prueba')
    .then(() => console.log("conected"))
    .catch(err => console.log(err))

export default mongoose