import React, { useState } from "react";

function WorkoutViewer({ workoutSplits }) {
  const [selectedSplit, setSelectedSplit] = useState(null);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">View Workouts</h1>

      {!selectedSplit ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">Workout Splits</h2>
          <div className="flex flex-wrap gap-4">
            {workoutSplits.map((split) => (
              <div
                key={split.id}
                className="p-4 border rounded shadow-md w-48 text-center cursor-pointer hover:bg-gray-200"
                onClick={() => setSelectedSplit(split)}
              >
                <h3 className="text-lg font-bold">{split.name}</h3>
              </div>
            ))}
          </div>
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
          {selectedSplit.weeks.map((week) => (
            <div key={week.id} className="mb-6">
              <h3 className="text-xl font-bold mb-2">{week.name}</h3>
              {week.days.map((day) => (
                <div key={day.day} className="border-b pb-4 mb-4">
                  <h4 className="text-lg font-semibold">{day.day}</h4>
                  {day.exercises.length === 0 ? (
                    <p className="text-gray-500 text-sm">No exercises added</p>
                  ) : (
                    <ul className="text-sm">
                      {day.exercises.map((exercise, index) => (
                        <li key={index} className="mb-1">
                          {exercise.name}: {exercise.reps} reps x {exercise.sets} sets
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WorkoutViewer;
