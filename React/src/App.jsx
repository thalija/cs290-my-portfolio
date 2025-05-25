import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import EditExercisePage from './pages/EditExercisePage';
import AddExercisePage from './pages/AddExercisePage';
import { useState } from 'react';



function App() {

  const [exerciseToEdit, setExerciseToEdit] = useState([]);

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit} />}></Route>
          <Route path="/edit-exercise" element={<EditExercisePage exerciseToEdit={exerciseToEdit} /> }></Route>
          <Route path="/add-exercise" element={ <AddExercisePage /> }></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App;
