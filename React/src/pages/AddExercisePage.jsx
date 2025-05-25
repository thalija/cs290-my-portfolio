import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AddExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    const navigate = useNavigate();

    const addExercies = async () => {
        const newExercise = {name, reps, weight, unit, date}
        const response = await fetch(
             '/exercises', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(newExercise)
            }
        );
        if (response.status === 201){
            alert("The exercise has been created and added to the database.")
        } else {
            alert("Failed to add the exercise.")
        }
        navigate('/')
    };

    return (
        <div>
            <h1>Add Exercise</h1>
            <input
                type="text"
                placeholder="Enter name here"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                value={reps}
                placeholder="Enter reps here"
                onChange={e => setReps(e.target.valueAsNumber)} />
            <input
                type="number"
                value={weight}
                placeholder="Enter weight here"
                onChange={e => setWeight(e.target.valueAsNumber)} />       
            <select value={unit} onChange={e => setUnit(e.target.value)}>  
                <option value="">--Please choose an option--</option>                 
                <option value="kgs">kgs</option>
                <option value="lbs">lbs</option>         
            </select> 
            <input
                type="text"
                value={date}
                placeholder="Enter date dd-mm-yy"
                onChange={e => setDate(e.target.value)} /> 
                   
            <button className="save-button" onClick={addExercies}>Save</button>
            
            <footer className="set-footer">
            <p>© 2025 Ahmed Thalij</p>
            </footer>
        </div>
    );
}

export default AddExercisePage;