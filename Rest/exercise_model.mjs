// Get the mongoose object
import mongoose from 'mongoose';
import 'dotenv/config';

const CONTACT_CLASS = 'Exercise';
let connection = undefined;
let Exercise = undefined;
/**
 * This function connects to the MongoDB server.
 */
async function connect(){
    try{
        await mongoose.connect(process.env.MONGODB_CONNECT_STRING);
        connection = mongoose.connection;
        console.log("Successfully connected to MongoDB using Mongoose!");
        Exercise = createModel();
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

function createModel(){
    const contactSchema = mongoose.Schema({
        name: {type: String, required: true},
        reps: {type: Number, required: true},
        weight: {type: Number, required: true},
        unit: {type: String, required: true},
        date: {type: String, required: true}
    }, {collection: 'exercises'});
    return mongoose.model(CONTACT_CLASS, contactSchema);
}

async function createExercie(name, reps, weight, unit, date){
    const newExercise = new Exercise({name: name, reps: reps, weight: weight, unit: unit, date: date});
    return newExercise.save();
}

async function getAllExercises(){
    return Exercise.find();
}

async function findExerciseByID(_id){
    const query = await Exercise.findById(_id);
    return query;
}

async function editExerciseById(_id, update){
    const result = await Exercise.updateOne({_id: _id}, update);
    if (result === null) {
        return null;
    } else {
       const updatedDoc = await Exercise.findById(_id);
       return updatedDoc;
    }
}

async function deleteExerciseById(_id){
    const result = await Exercise.deleteOne({_id: _id});
    return result.deletedCount;
}

export {connect, createExercie, getAllExercises, findExerciseByID, editExerciseById, deleteExerciseById};
