import React, { useState } from "react";
import exercises from "../data/exercises";

function Planner() {
  const [workouts, setWorkouts] = useState([]);
  const [form, setForm] = useState({ date: "", exercises: [] });
  const [exercise, setExercise] = useState({ name: "", reps: 0, sets: 0 });

  // Add an exercise to the current workout form
  const addExerciseToWorkout = () => {
    if (exercise.name) {
      setForm({
        ...form,
        exercises: [...form.exercises, exercise],
      });
      setExercise({ name: "", reps: 0, sets: 0 });
    }
  };

  // Save the completed workout
  const saveWorkout = () => {
    if (form.date && form.exercises.length > 0) {
      setWorkouts([...workouts, { ...form, id: workouts.length + 1 }]);
      setForm({ date: "", exercises: [] });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Workout Planner</h1>

      {/* Add Workout Form */}
      <div className="border p-4 mb-6">
        <label className="block mb-2">Date:</label>
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="p-2 border rounded w-full mb-4"
        />

        <h2 className="text-lg font-bold mb-2">Add Exercises</h2>
        <label className="block mb-2">Exercise:</label>
        <select
          value={exercise.name}
          onChange={(e) => setExercise({ ...exercise, name: e.target.value })}
          className="p-2 border rounded w-full mb-4"
        >
          <option value="">Select an exercise</option>
          {exercises.map((ex) => (
            <option key={ex.id} value={ex.name}>
              {ex.name}
            </option>
          ))}
        </select>
        <label className="block mb-2">Reps:</label>
        <input
          type="number"
          value={exercise.reps}
          onChange={(e) => setExercise({ ...exercise, reps: +e.target.value })}
          className="p-2 border rounded w-full mb-4"
        />
        <label className="block mb-2">Sets:</label>
        <input
          type="number"
          value={exercise.sets}
          onChange={(e) => setExercise({ ...exercise, sets: +e.target.value })}
          className="p-2 border rounded w-full mb-4"
        />
        <button
          type="button"
          onClick={addExerciseToWorkout}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Exercise
        </button>
      </div>

      <div className="border p-4 mb-6">
        <h2 className="text-lg font-bold mb-4">Current Workout:</h2>
        <ul>
          {form.exercises.map((ex, index) => (
            <li key={index}>
              {ex.name} - {ex.reps} reps x {ex.sets} sets
            </li>
          ))}
        </ul>
        <button
          onClick={saveWorkout}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
        >
          Save Workout
        </button>
      </div>

      {/* Display Saved Workouts */}
      <h2 className="text-2xl font-bold mb-4">Saved Workouts</h2>
      <ul>
        {workouts.map((workout) => (
          <li key={workout.id} className="p-4 bg-gray-100 mb-4 rounded shadow">
            <h3 className="text-xl font-bold">{workout.date}</h3>
            <ul>
              {workout.exercises.map((ex, index) => (
                <li key={index}>
                  {ex.name} - {ex.reps} reps x {ex.sets} sets
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Planner;
