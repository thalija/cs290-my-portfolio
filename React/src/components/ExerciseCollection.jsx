import Exercise from './Exercise';

function ExerciseCollection({ exercises , onDelete, onEdit}) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Unit</th>
                    <th>Date</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {exercises.map((exercise, i) => <Exercise exercise={exercise} onDelete={onDelete} onEdit={onEdit} key={i}/>)}
            </tbody>
        </table>       
    );
}

export default ExerciseCollection;