import React from "react";

function AddWeek({ onAddWeek, currentWeekNumber }) {
  const handleAddWeek = () => {
    const weekName = `Week ${currentWeekNumber + 1}`;
    onAddWeek(weekName); // Pass the dynamically calculated week name
  };

  return (
    <div className="p-4 border rounded mb-6">
      <h2 className="text-xl font-bold mb-4">Add a New Week</h2>
      <button
        onClick={handleAddWeek}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Week {currentWeekNumber + 1}
      </button>
    </div>
  );
}

export default AddWeek;
