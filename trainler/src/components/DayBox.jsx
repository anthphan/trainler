import React from "react";

function DayBox({ day, dayID, exercises = [], onAddClick, onEditExercise, onRemoveExercise }) {
  const exercisesArray = Array.isArray(exercises) ? exercises : [];

  return (
    <div className="w-full border-b border-gray-300 bg-gray-100 py-4">
      <div className="px-4 mb-2">
        <h3 className="text-lg font-bold text-gray-800">{day}</h3>
      </div>
      <div className="px-4">
        {exercisesArray.length === 0 ? (
          <p className="text-gray-500 text-sm">No exercises added</p>
        ) : (
          <table className="table-auto w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-2 py-1">Exercise</th>
                <th className="px-2 py-1">Sets</th>
                <th className="px-2 py-1">Reps</th>
                <th className="px-2 py-1"></th>
              </tr>
            </thead>
            <tbody>
              {exercisesArray.map((ex, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td className="px-2 py-1">{ex.name}</td>
                  <td className="px-2 py-1">{ex.sets}</td>
                  <td className="px-2 py-1">{ex.reps}</td>
                  <td className="px-2 py-1 flex gap-2">
                    <button
                      onClick={() => onEditExercise(dayID, index)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onRemoveExercise(dayID, index)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="px-4 mt-4">
        <button
          onClick={() => onAddClick(dayID, day)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Exercise
        </button>
      </div>
    </div>
  );
}

export default DayBox;
