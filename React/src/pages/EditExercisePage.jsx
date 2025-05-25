import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const EditExercisePage = ({exerciseToEdit}) =>  { 
        const [name, setName] = useState(exerciseToEdit.name);
        const [reps, setReps] = useState(exerciseToEdit.reps);
        const [weight, setWeight] = useState(exerciseToEdit.weight);
        const [unit, setUnit] = useState(exerciseToEdit.unit);
        const [date, setDate] = useState(exerciseToEdit.date);
    
        const navigate = useNavigate();
    
        const editExercies = async () => {
            const editedExercise = {name, reps, weight, unit, date}
            const response = await fetch(
                 `/exercises/${exerciseToEdit._id}`, {
                    method: 'PUT',
                    headers: {'content-type': 'application/json'},
                    body: JSON.stringify(editedExercise)
                }
            );
            if (response.status === 200){
                alert("Successfully edited exercise")
            } else {
                alert("Failed to edit exercise.")
            }
            navigate('/')
        };
    
        return (
            <div>
                <h2>Edit Exercise</h2>
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)} />
                <input
                    type="number"
                    value={reps}
                    onChange={e => setReps(e.target.valueAsNumber)} />
                <input
                    type="number"
                    value={weight}
                    onChange={e => setWeight(e.target.valueAsNumber)} />    
                <select value={unit} onChange={e => setUnit(e.target.value)}>                  
                    <option value="kgs">kgs</option>
                    <option value="lbs">lbs</option>         
                </select> 
                <input
                    type="text"
                    value={date}
                    onChange={e => setDate(e.target.value)} /> 
                       
                <button className="save-button" onClick={editExercies}>Edit</button>

                <footer className="set-footer">
                <p>© 2025 Ahmed Thalij</p>
                </footer>
            </div>
        );
}

export default EditExercisePage;