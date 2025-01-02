import React, { useState, useEffect } from "react";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import awsExports from "../aws-exports";
import { listWorkoutSplits } from "../graphql/queries";
import { deleteWorkoutSplit } from "../graphql/mutations";

Amplify.configure(awsExports);
const client = generateClient();

function WorkoutViewer() {
  const [workoutSplits, setWorkoutSplits] = useState([]);
  const [selectedSplit, setSelectedSplit] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch workout splits on mount
  useEffect(() => {
    const fetchWorkoutSplits = async () => {
      try {
        setLoading(true);
        const response = await client.graphql({
          query: listWorkoutSplits,
        });

        const splits = response.data.listWorkoutSplits.items || [];
        setWorkoutSplits(splits);
      } catch (error) {
        console.error("Error fetching workout splits:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkoutSplits();
  }, []);

  // Delete a workout split
  const deleteSplit = async (splitId) => {
    if (!window.confirm("Are you sure you want to delete this workout split?")) {
      return;
    }

    try {
      await client.graphql({
        query: deleteWorkoutSplit,
        variables: { input: { id: splitId } },
      });

      // Remove the split from local state
      setWorkoutSplits((prevSplits) =>
        prevSplits.filter((split) => split.id !== splitId)
      );
      alert("Workout split deleted successfully.");
    } catch (error) {
      console.error("Error deleting workout split:", error);
      alert("Failed to delete the workout split. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">View Your Workouts</h1>

      {loading ? (
        <p className="text-gray-500 text-sm">Loading workout splits...</p>
      ) : !selectedSplit ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">Workout Splits</h2>
          {workoutSplits.length === 0 ? (
            <p className="text-gray-500 text-sm">No workout splits available.</p>
          ) : (
            <div className="flex flex-wrap gap-4">
              {workoutSplits.map((split) => (
                <div
                  key={split.id}
                  className="p-4 border rounded shadow-md w-48 text-center hover:bg-gray-200"
                >
                  <h3 className="text-lg font-bold">{split.name}</h3>
                  <button
                    onClick={() => setSelectedSplit(split)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
                  >
                    View
                  </button>
                  <button
                    onClick={() => deleteSplit(split.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-2"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">{selectedSplit.name}</h2>
          <button
            onClick={() => setSelectedSplit(null)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mb-4"
          >
            Back to Splits
          </button>

          {selectedSplit.weeks?.length === 0 ? (
            <p className="text-gray-500 text-sm">No weeks available for this split.</p>
          ) : (
            selectedSplit.weeks?.map((week) => (
              <div key={week.id} className="mb-6">
                <h3 className="text-xl font-bold mb-2">{week.name}</h3>
                {week.days?.length === 0 ? (
                  <p className="text-gray-500 text-sm">No days available in this week.</p>
                ) : (
                  week.days?.map((day) => (
                    <div key={day.day} className="border-b pb-4 mb-4">
                      <h4 className="text-lg font-semibold">{day.day}</h4>
                      {day.exercises?.length === 0 ? (
                        <p className="text-gray-500 text-sm">No exercises added</p>
                      ) : (
                        <ul className="text-sm">
                          {day.exercises?.map((exercise, index) => (
                            <li key={index} className="mb-1">
                              <span className="font-semibold">{exercise.name}</span>:{" "}
                              {exercise.reps} reps x {exercise.sets} sets
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default WorkoutViewer;
