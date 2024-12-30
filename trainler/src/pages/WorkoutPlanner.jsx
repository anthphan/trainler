import React, { useState } from "react";
import CreateWorkoutSplit from "../components/CreateWorkoutSplit";
import AddWeek from "../components/AddWeek";
import DayBox from "../components/DayBox";

function WorkoutPlanner() {
  const [workoutSplits, setWorkoutSplits] = useState([]);
  const [selectedSplit, setSelectedSplit] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [exerciseForm, setExerciseForm] = useState({ name: "", reps: 0, sets: 0 });
  const [editForm, setEditForm] = useState({ name: "", reps: 0, sets: 0, index: null });

  // Save a new workout split
  const saveSplit = (newSplit) => {
    setWorkoutSplits([...workoutSplits, { ...newSplit, weeks: [] }]);
    setSelectedSplit({ ...newSplit, weeks: [] });
  };

  // Add a new week to the selected split
  const addWeek = (weekName) => {
    const newWeek = {
      id: Date.now(),
      name: weekName,
      days: [
        { day: "Monday", exercises: [] },
        { day: "Tuesday", exercises: [] },
        { day: "Wednesday", exercises: [] },
        { day: "Thursday", exercises: [] },
        { day: "Friday", exercises: [] },
        { day: "Saturday", exercises: [] },
        { day: "Sunday", exercises: [] },
      ],
    };

    setWorkoutSplits((prevSplits) =>
      prevSplits.map((split) =>
        split.id === selectedSplit.id
          ? { ...split, weeks: [...split.weeks, newWeek] }
          : split
      )
    );
    setSelectedSplit((prevSplit) => ({
      ...prevSplit,
      weeks: [...prevSplit.weeks, newWeek],
    }));
    setSelectedWeek(newWeek);
  };

  // Add an exercise to a specific day
  const addExerciseToDay = (day) => {
    if (!exerciseForm.name || !exerciseForm.reps || !exerciseForm.sets) {
      alert("Please fill in all fields before saving!");
      return;
    }
    if (selectedWeek) {
      const updatedWeek = {
        ...selectedWeek,
        days: selectedWeek.days.map((d) =>
          d.day === day
            ? { ...d, exercises: [...d.exercises, exerciseForm] }
            : d
        ),
      };

      setWorkoutSplits((prevSplits) =>
        prevSplits.map((split) =>
          split.id === selectedSplit.id
            ? {
                ...split,
                weeks: split.weeks.map((week) =>
                  week.id === selectedWeek.id ? updatedWeek : week
                ),
              }
            : split
        )
      );

      setSelectedSplit((prevSplit) => ({
        ...prevSplit,
        weeks: prevSplit.weeks.map((week) =>
          week.id === selectedWeek.id ? updatedWeek : week
        ),
      }));
      setSelectedWeek(updatedWeek);
      setExerciseForm({ name: "", reps: 0, sets: 0 });
      setSelectedDay(null);
    }
  };

  // Remove an exercise from a specific day
  const removeExercise = (day, exerciseIndex) => {
    if (selectedWeek) {
      const updatedWeek = {
        ...selectedWeek,
        days: selectedWeek.days.map((d) =>
          d.day === day
            ? {
                ...d,
                exercises: d.exercises.filter((_, index) => index !== exerciseIndex),
              }
            : d
        ),
      };

      setWorkoutSplits((prevSplits) =>
        prevSplits.map((split) =>
          split.id === selectedSplit.id
            ? {
                ...split,
                weeks: split.weeks.map((week) =>
                  week.id === selectedWeek.id ? updatedWeek : week
                ),
              }
            : split
        )
      );

      setSelectedSplit((prevSplit) => ({
        ...prevSplit,
        weeks: prevSplit.weeks.map((week) =>
          week.id === selectedWeek.id ? updatedWeek : week
        ),
      }));
      setSelectedWeek(updatedWeek);
    }
  };

  // Edit an exercise
  const editExercise = (day, index) => {
    const exercise = selectedWeek.days
      .find((d) => d.day === day)
      .exercises[index];

    setEditForm({ ...exercise, index });
    setSelectedDay(day);
  };

  const saveEditedExercise = () => {
    if (selectedWeek) {
      const updatedWeek = {
        ...selectedWeek,
        days: selectedWeek.days.map((d) =>
          d.day === selectedDay
            ? {
                ...d,
                exercises: d.exercises.map((ex, idx) =>
                  idx === editForm.index
                    ? { name: editForm.name, reps: editForm.reps, sets: editForm.sets }
                    : ex
                ),
              }
            : d
        ),
      };
  
      setWorkoutSplits((prevSplits) =>
        prevSplits.map((split) =>
          split.id === selectedSplit.id
            ? {
                ...split,
                weeks: split.weeks.map((week) =>
                  week.id === selectedWeek.id ? updatedWeek : week
                ),
              }
            : split
        )
      );
  
      setSelectedSplit((prevSplit) => ({
        ...prevSplit,
        weeks: prevSplit.weeks.map((week) =>
          week.id === selectedWeek.id ? updatedWeek : week
        ),
      }));
      setSelectedWeek(updatedWeek);
      setEditForm({ name: "", reps: 0, sets: 0, index: null });
      setSelectedDay(null); // Close modal
    }
  };  

  const cancelEditOrAdd = () => {
    setEditForm({ name: "", reps: 0, sets: 0, index: null }); // Reset edit form
    setExerciseForm({ name: "", reps: 0, sets: 0 }); // Reset add form
    setSelectedDay(null); // Close modal
  };  

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Workout Planner</h1>

      {!selectedSplit ? (
        <CreateWorkoutSplit onSave={saveSplit} />
      ) : !selectedWeek ? (
        <>
          <AddWeek
            onAddWeek={addWeek}
            currentWeekNumber={selectedSplit.weeks.length}
          />
          <h2 className="text-2xl font-bold mt-6 mb-4">Weeks for {selectedSplit.name}</h2>
          <div className="flex flex-wrap gap-4">
            {selectedSplit.weeks.map((week) => (
              <div
                key={week.id}
                className="p-4 border rounded shadow-md w-48 text-center cursor-pointer hover:bg-gray-200"
                onClick={() => setSelectedWeek(week)}
              >
                <h3 className="text-lg font-bold">{week.name}</h3>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">{selectedWeek.name}</h2>
          <button
            onClick={() => setSelectedWeek(null)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mb-4"
          >
            Back to Weeks
          </button>
          <div className="w-full">
            {selectedWeek.days.map((day) => (
              <DayBox
                key={day.day}
                day={day.day}
                exercises={day.exercises}
                onAddClick={() => setSelectedDay(day.day)}
                onEditExercise={editExercise}
                onRemoveExercise={removeExercise}
              />
            ))}
          </div>
        </div>
      )}

      {selectedDay && editForm.index === null && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-bold mb-4">Add Exercise for {selectedDay}</h2>
            <label className="block mb-2">Exercise Name:</label>
            <input
              type="text"
              value={exerciseForm.name}
              onChange={(e) => setExerciseForm({ ...exerciseForm, name: e.target.value })}
              className="p-2 border rounded w-full mb-4"
            />
            <label className="block mb-2">Sets:</label>
            <input
              type="number"
              value={exerciseForm.sets}
              onChange={(e) => setExerciseForm({ ...exerciseForm, sets: +e.target.value })}
              className="p-2 border rounded w-full mb-4"
            />
            <label className="block mb-2">Reps:</label>
            <input
              type="number"
              value={exerciseForm.reps}
              onChange={(e) => setExerciseForm({ ...exerciseForm, reps: +e.target.value })}
              className="p-2 border rounded w-full mb-4"
            />
            <div className="flex justify-between">
              <button
                onClick={() => addExerciseToDay(selectedDay)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
              <button
                onClick={cancelEditOrAdd}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedDay && editForm.index !== null && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-bold mb-4">Edit Exercise for {selectedDay}</h2>
            <label className="block mb-2">Exercise Name:</label>
            <input
              type="text"
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              className="p-2 border rounded w-full mb-4"
            />
            <label className="block mb-2">Sets:</label>
            <input
              type="number"
              value={editForm.sets}
              onChange={(e) => setEditForm({ ...editForm, sets: +e.target.value })}
              className="p-2 border rounded w-full mb-4"
            />
            <label className="block mb-2">Reps:</label>
            <input
              type="number"
              value={editForm.reps}
              onChange={(e) => setEditForm({ ...editForm, reps: +e.target.value })}
              className="p-2 border rounded w-full mb-4"
            />
            <div className="flex justify-between">
              <button
                onClick={saveEditedExercise}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
              <button
                onClick={cancelEditOrAdd}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WorkoutPlanner;
