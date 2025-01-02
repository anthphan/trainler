import React, { useState, useEffect } from "react";
import CreateWorkoutSplit from "../components/CreateWorkoutSplit";
import AddWeek from "../components/AddWeek";
import DayBox from "../components/DayBox";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import awsExports from "../aws-exports";
import { v4 as uuidv4 } from "uuid";
import { getCurrentUser } from "aws-amplify/auth";

// GraphQL operations
import { listWorkoutSplits, listWeeks, listDays, listExercises } from "../graphql/queries";
import { createWorkoutSplit, createWeek, createDay, createExercise, updateExercise, deleteExercise } from "../graphql/mutations";

Amplify.configure(awsExports);

const client = generateClient();

function WorkoutPlanner() {
  const [workoutSplits, setWorkoutSplits] = useState([]);
  const [selectedSplit, setSelectedSplit] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [exerciseForm, setExerciseForm] = useState({ name: "", reps: 0, sets: 0 });
  const [editForm, setEditForm] = useState({ name: "", reps: 0, sets: 0, index: null });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWorkoutSplits();
  }, []);

  const fetchWorkoutSplits = async () => {
    setLoading(true);
    try {
      const response = await client.graphql({ query: listWorkoutSplits });
      setWorkoutSplits(response.data.listWorkoutSplits.items || []);
    } catch (error) {
      console.error("Error fetching workout splits:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeeksForSplit = async (splitID) => {
    try {
      const response = await client.graphql({
        query: listWeeks,
        variables: { filter: { workoutSplitID: { eq: splitID } }, limit: 100 },
      });
      return response.data.listWeeks.items || [];
    } catch (error) {
      console.error("Error fetching weeks:", error);
      return [];
    }
  };

  const fetchDaysForWeek = async (weekID) => {
    try {
      const response = await client.graphql({
        query: listDays,
        variables: { filter: { weekID: { eq: weekID } }, limit: 7 },
      });
      return response.data.listDays.items || [];
    } catch (error) {
      console.error("Error fetching days:", error);
      return [];
    }
  };

  const fetchExercisesForDay = async (dayID) => {
    try {
      const response = await client.graphql({
        query: listExercises,
        variables: { filter: { dayID: { eq: dayID } } },
      });
      return response.data.listExercises.items || [];
    } catch (error) {
      console.error("Error fetching exercises for day:", error);
      return [];
    }
  };
  

  const saveSplit = async (newSplit) => {
    if (!newSplit.name) {
      alert("Workout split name is required.");
      return;
    }
    try {
      const user = await getCurrentUser();
      const input = { id: uuidv4(), name: newSplit.name, userID: user.userId, owner: user.username };
      const response = await client.graphql({ query: createWorkoutSplit, variables: { input } });
      const createdSplit = response.data.createWorkoutSplit;

      setWorkoutSplits((prev) => [...prev, createdSplit]);
      setSelectedSplit(createdSplit);
    } catch (error) {
      console.error("Error saving workout split:", error);
    }
  };

  const addWeek = async (weekName) => {
    if (!weekName) return alert("Week name is required.");
  
    try {
      const input = { name: weekName, workoutSplitID: selectedSplit.id };
      const response = await client.graphql({ query: createWeek, variables: { input } });
      const newWeek = response.data.createWeek;
  
      // Create and save 7 days for the new week
      const days = await Promise.all(
        Array.from({ length: 7 }).map((_, i) =>
          client.graphql({
            query: createDay,
            variables: {
              input: {
                dayName: `Day ${i + 1}`,
                weekID: newWeek.id,
              },
            },
          }).then((res) => res.data.createDay)
        )
      );
  
      setSelectedSplit((prev) => ({
        ...prev,
        weeks: [...(prev.weeks || []), { ...newWeek, days }],
      }));
  
      setSelectedWeek({ ...newWeek, days }); // Select the newly created week
    } catch (error) {
      console.error("Error adding week and days:", error);
    }
  };  

  const selectSplit = async (split) => {
    setLoading(true);
    try {
      const weeks = await fetchWeeksForSplit(split.id);
      setSelectedSplit({ ...split, weeks });
    } catch (error) {
      console.error("Error fetching weeks:", error);
    } finally {
      setLoading(false);
    }
  };
  

  const selectWeek = async (week) => {
    setLoading(true);
    try {
      const days = await fetchDaysForWeek(week.id);
      const daysWithExercises = await Promise.all(
        days.map(async (day) => ({
          ...day,
          exercises: Array.isArray(day.exercises) ? day.exercises : await fetchExercisesForDay(day.id) || [],
        }))
      );
  
      const fullWeek = Array.from({ length: 7 }, (_, i) => {
        const existingDay = daysWithExercises.find((day) => day.dayName === `Day ${i + 1}`);
        return (
          existingDay || {
            id: uuidv4(),
            dayName: `Day ${i + 1}`,
            weekID: week.id,
            exercises: [], // Ensure exercises is always an array
          }
        );
      });
  
      setSelectedWeek({ ...week, days: fullWeek });
    } catch (error) {
      console.error("Error fetching days or exercises:", error);
    } finally {
      setLoading(false);
    }
  };
  
  
  
  
  const addExerciseToDay = async () => {
    if (!exerciseForm.name || !exerciseForm.reps || !exerciseForm.sets) {
      return alert("All fields are required.");
    }
  
    try {
      const input = { ...exerciseForm, dayID: selectedDay.id }; // Use persistent day ID
      console.log("Saving exercise to DB:", input);
  
      // Save to database
      const response = await client.graphql({ query: createExercise, variables: { input } });
      const newExercise = response.data.createExercise;
  
      // Update local state
      setSelectedWeek((prevWeek) => ({
        ...prevWeek,
        days: prevWeek.days.map((day) =>
          day.id === selectedDay.id
            ? { ...day, exercises: [...(day.exercises || []), newExercise] }
            : day
        ),
      }));
  
      // Reset form and close modal
      setExerciseForm({ name: "", sets: 0, reps: 0 });
      setSelectedDay(null);
  
      console.log("Exercise saved successfully:", newExercise);
    } catch (error) {
      console.error("Error saving exercise:", error);
    }
  };
  
  

  const removeExercise = async (dayID, exerciseIndex) => {
    try {
      const day = selectedWeek.days.find((d) => d.id === dayID);
      const exerciseToDelete = day?.exercises[exerciseIndex];
      if (!exerciseToDelete) return;

      await client.graphql({
        query: deleteExercise,
        variables: { input: { id: exerciseToDelete.id } },
      });

      updateDayWithExercise(dayID, null, exerciseIndex);
    } catch (error) {
      console.error("Error removing exercise:", error);
    }
  };

  const updateDayWithExercise = (dayID, exercise, index = null) => {
    setSelectedWeek((prev) => ({
      ...prev,
      days: prev.days.map((d) =>
        d.id === dayID
          ? {
              ...d,
              exercises:
                index !== null
                  ? exercise
                    ? d.exercises.map((ex, i) => (i === index ? exercise : ex))
                    : d.exercises.filter((_, i) => i !== index)
                  : [...(d.exercises || []), exercise],
            }
          : d
      ),
    }));
  };

  const editExercise = (dayID, exerciseIndex) => {
    const day = selectedWeek?.days.find((d) => d.id === dayID);
    if (!day) {
      console.error("Day not found:", dayID);
      return;
    }
  
    const exerciseToEdit = day.exercises[exerciseIndex];
    if (!exerciseToEdit) {
      console.error("Exercise not found at index:", exerciseIndex);
      return;
    }
  
    setEditForm({
      id: exerciseToEdit.id,
      name: exerciseToEdit.name,
      reps: exerciseToEdit.reps,
      sets: exerciseToEdit.sets,
      index: exerciseIndex,
    });
  
    setSelectedDay({ id: dayID, name: day.dayName });
  };
  

  const cancelEditOrAdd = () => {
    setExerciseForm({ name: "", reps: 0, sets: 0 });
    setEditForm({ name: "", reps: 0, sets: 0, index: null });
    setSelectedDay(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Workout Planner</h1>

      {!selectedSplit ? (
      // Render the Create Workout Split form and list of workout splits
      <>
        <h2 className="text-2xl font-bold mb-4">Create a New Workout Split</h2>
        <CreateWorkoutSplit onSave={saveSplit} />
        <h2 className="text-2xl font-bold mt-6 mb-4">Your Workout Splits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workoutSplits.length === 0 ? (
            <p className="text-gray-500">No workout splits created yet.</p>
          ) : (
            workoutSplits.map((split) => (
              <div
                key={split.id}
                className="p-4 border rounded shadow-md bg-gray-100 cursor-pointer hover:bg-gray-200"
                onClick={() => selectSplit(split)}
              >
                <h3 className="text-xl font-bold">{split.name}</h3>
              </div>
            ))
          )}
        </div>
      </>
    ) : !selectedWeek ? (
      // Render weeks for the selected split
      <>
        <AddWeek
          onAddWeek={addWeek}
          currentWeekNumber={selectedSplit?.weeks?.length || 0}
        />
        <h2 className="text-2xl font-bold mt-6 mb-4">
          Weeks for {selectedSplit.name}
        </h2>
        <div className="flex flex-wrap gap-4">
        {selectedSplit?.weeks?.length > 0 ? (
          selectedSplit.weeks.map((week) => (
            <div
              key={week.id}
              className="p-4 border rounded shadow-md bg-gray-100 cursor-pointer hover:bg-gray-200"
              onClick={() => selectWeek(week)}
            >
              <h3 className="text-lg font-bold">{week.name}</h3>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No weeks available for this split.</p>
        )}
        </div>
        <button
          onClick={() => setSelectedSplit(null)}
          className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back to Workout Splits
        </button>
      </>
    ) : (
      // Render days for the selected week
      <div>
        <h2 className="text-2xl font-bold mb-4">{selectedWeek.name}</h2>
        <button
          onClick={() => setSelectedWeek(null)}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mb-4"
        >
          Back to Weeks
        </button>
        <div className="w-full">
        {selectedWeek?.days?.length > 0 ? (
          selectedWeek.days.map((day) => (
            <DayBox
              key={day.id}
              day={day.dayName}
              dayID={day.id}
              exercises={day.exercises || []}
              onAddClick={(dayID, dayName) => setSelectedDay({ id: dayID, name: dayName })}
              onEditExercise={editExercise} // Pass the editExercise function
              onRemoveExercise={removeExercise}
            />
          ))
        ) : (
          <p className="text-gray-500 text-sm">No days available for this week.</p>
        )}
        </div>
      </div>
    )}

    {selectedDay && editForm.index === null && (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-lg font-bold mb-4">Add Exercise for {selectedDay.name}</h2>
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
              onClick={() => addExerciseToDay()} // This triggers the function
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
          <h2 className="text-lg font-bold mb-4">Edit Exercise for {selectedDay.name}</h2>
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
              onClick={editExercise}
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

export default withAuthenticator(WorkoutPlanner);
