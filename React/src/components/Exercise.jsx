import '../App.css';
import RemoveExercise from './RemoveExercise'
import { MdEdit } from "react-icons/md";
import { useNavigate } from 'react-router-dom';



function Exercise({ exercise , onDelete, onEdit}) {

    const navigate = useNavigate();

    const editExercise = () => {
        navigate('/edit-exercise')
    }
    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td><RemoveExercise exercise={ exercise } onDelete={ onDelete } /></td>
            <td><MdEdit onClick={() => onEdit(exercise)} /></td>
        </tr>
    );
}


export default Exercise;