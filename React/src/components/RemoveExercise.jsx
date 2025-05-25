import {useState} from 'react';
import { MdDelete } from "react-icons/md";

function RemoveExercise({exercise , onDelete}){  
    return (
        <>
         <button onClick= {e => {e.preventDefault(); onDelete(exercise._id)}} >
            <MdDelete />
         </button>   
        </>
    );
}
export default RemoveExercise;