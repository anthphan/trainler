import React, { useState } from "react";

function CreateWorkoutSplit({ onSave }) {
  const [splitName, setSplitName] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    const newSplit = {
      id: Date.now(),
      name: splitName,
      weeks: [],
    };
    onSave(newSplit);
    setSplitName("");
  };

  return (
    <div className="p-4 border rounded mb-4">
      <h2 className="text-xl font-bold mb-4">Create Workout Split</h2>
      <form onSubmit={handleSave}>
        <label className="block mb-2">Split Name:</label>
        <input
          type="text"
          value={splitName}
          onChange={(e) => setSplitName(e.target.value)}
          className="p-2 border rounded w-full mb-4"
          placeholder="E.g., Push/Pull/Legs"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Split
        </button>
      </form>
    </div>
  );
}

export default CreateWorkoutSplit;
