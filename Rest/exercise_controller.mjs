import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './exercise_model.mjs';

const app = express();
app.use(express.json())

const PORT = process.env.PORT;

app.listen(PORT, async () => {
    await exercises.connect(false)
    console.log(`Server listening on port ${PORT}...`);
});

function isDateValid(date) {
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

app.post('/exercises', asyncHandler(async (req, res) => {
    const name = req.body.name
    const reps = req.body.reps
    const weight = req.body.weight
    const unit = req.body.unit
    const date = req.body.date
    if (!name || !reps || !weight || !unit || !date ){
        return res.status(400).send({"Error": "Invalid request"});
    }
    if (typeof name !== 'string' && name.length <= 0 && name === 'null'){
        return res.status(400).send({"Error": "Invalid request"});
    }
    if (!Number.isInteger(reps) || reps <= 0){
        return res.status(400).send({"Error": "Invalid request"});
    }
    if (!Number.isInteger(weight) || weight <= 0){
        return res.status(400).send({"Error": "Invalid request"});
    }
    if (unit !== "kgs" && unit !=="lbs"){
        return res.status(400).send({"Error": "Invalid request"});
    }

    if (!isDateValid(date)){
        return res.status(400).send({"Error": "Invalid request"});
    }
    
    const result = await exercises.createExercie(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date);
    res.status(201);
    res.send(result);

    }));       

app.get('/exercises', asyncHandler(async(req, res) => {
    const result = await exercises.getAllExercises()
    res.status(200);
    res.send(result); 
}));   

app.get('/exercises/:id', asyncHandler(async(req, res) => {
    const result = await exercises.findExerciseByID(req.params.id);
    if (result === null){
        res.status(404);
        res.send({"Error": "Not found"});
    } else {
        res.status(200);
        res.send(result);
    }
}));

app.put('/exercises/:id', asyncHandler(async(req, res) => {
    const name = req.body.name
    const reps = req.body.reps
    const weight = req.body.weight
    const unit = req.body.unit
    const date = req.body.date
    if (!name || !reps || !weight || !unit || !date ){
        return res.status(400).send({"Error": "Invalid request"});
    }
    if (typeof name !== 'string' && name.length <= 0 && name === 'null'){
        return res.status(400).send({"Error": "Invalid request"});
    }
    if (!Number.isInteger(reps) || reps <= 0){
        return res.status(400).send({"Error": "Invalid request"});
    }
    if (!Number.isInteger(weight) || weight <= 0){
        return res.status(400).send({"Error": "Invalid request"});
    }
    if (unit !== "kgs" && unit !=="lbs"){
        return res.status(400).send({"Error": "Invalid request"});
    }

    if (!isDateValid(date)){
        return res.status(400).send({"Error": "Invalid request"});
    }
    const result = await exercises.editExerciseById(req.params.id, req.body)
    if (result === null){
        res.status(404);
        res.send({"Error": "Not found"});
    } else {
        res.status(200);
        res.send(result);
    }

}));

app.delete('/exercises/:id', asyncHandler(async(req, res) => {
    const result = await exercises.deleteExerciseById(req.params.id);
    if (result === 0){
        res.status(404);
        res.send({"Error": "Not found"});
    } else {
        res.status(204);
        res.send({});
    }
}));
