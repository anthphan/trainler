import React, { useState } from "react";

function CreateWeek({ onSave }) {
  const [weekName, setWeekName] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    const newWeek = {
      id: Date.now(), // Unique ID
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
    onSave(newWeek);
    setWeekName(""); // Reset the input
  };

  return (
    <div className="p-4 border rounded mb-4">
      <h2 className="text-xl font-bold mb-4">Create a Week</h2>
      <form onSubmit={handleSave}>
        <label className="block mb-2">Week Name:</label>
        <input
          type="text"
          value={weekName}
          onChange={(e) => setWeekName(e.target.value)}
          className="p-2 border rounded w-full mb-4"
          placeholder="E.g., Week 1, Oct 1 - Oct 7"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save Week
        </button>
      </form>
    </div>
  );
}

export default CreateWeek;
