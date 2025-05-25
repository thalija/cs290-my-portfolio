import { Link } from "react-router-dom";
import ExerciseCollection from "../components/ExerciseCollection";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function HomePage( {setExerciseToEdit } ){
    const [exercises, setExercises] = useState([]);
    const navigate = useNavigate();

    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercises(data);
    }

    useEffect( () => {
        loadExercises();
    }, []);

     const onDelete = async (_id) => {
            const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' });
            if (response.status === 204) {
              setExercises(exercises.filter( ex => ex._id !== _id))  
            } else {
              alert(`Failed to delete movie with id = ${_id}`)
            }
          }

    const onEdit = async exerciseToEdit => {
        console.log(`this call from onEdit function + ${exerciseToEdit._id}`)
        setExerciseToEdit(exerciseToEdit);
        navigate("/edit-exercise");
    }

    const addExercise= () => {
        navigate("/add-exercise")
    }
    return (
        <>
        <div className="page-container">
            <h1>Exercises Tracker</h1>
            <p>Full Stack MERN App Demonstration</p>
        </div>
        <button className="create-button" onClick={addExercise}>Create Exercise</button>
        <ExerciseCollection exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseCollection>
        <footer className="set-footer">
            <p>© 2025 Ahmed Thalij</p>
        </footer>
        </>
    )
}

export default HomePage;