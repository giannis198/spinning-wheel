
"use client";

import { useState } from "react";
import Link from "next/link";


import { useStore } from "@/lib/store";

const EditPage = () => {
  const { segments, addSegment, removeSegment, updateSegment } = useStore();

  const [newSegment, setNewSegment] = useState("");

  const handleAdd = () => {
    if (newSegment.trim() !== "") {
      addSegment(newSegment.trim());
      setNewSegment("");
    }
  };

  const handleRemove = (segment: string) => {
    removeSegment(segment);
  };

  const [editingSegment, setEditingSegment] = useState<string | null>(null);
  const [editedSegment, setEditedSegment] = useState("");

  const handleEdit = (segment: string) => {
    setEditingSegment(segment);
    setEditedSegment(segment);
  };

  const handleUpdate = () => {
    if (editingSegment && editedSegment.trim() !== "") {
      updateSegment(editingSegment, editedSegment.trim());
      setEditingSegment(null);
      setEditedSegment("");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Wheel Items</h1>
      <div className="mb-4">
        <input
          type="text"
          value={newSegment}
          onChange={(e) => setNewSegment(e.target.value)}
          className="border p-2 mr-2"
          placeholder="New item"
        />
        <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>
      <ul>
        {segments.map((segment, index) => (
          <li key={index} className="flex justify-between items-center mb-2">
            {editingSegment === segment ? (
              <input
                type="text"
                value={editedSegment}
                onChange={(e) => setEditedSegment(e.target.value)}
                className="border p-2 mr-2"
              />
            ) : (
              <span>{segment}</span>
            )}
            <div>
              {editingSegment === segment ? (
                <button onClick={handleUpdate} className="bg-green-500 text-white px-2 py-1 rounded mr-2">
                  Update
                </button>
              ) : (
                <button onClick={() => handleEdit(segment)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                  Edit
                </button>
              )}
              <button
                onClick={() => handleRemove(segment)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <Link href="/" className="text-blue-500 mt-4 inline-block">
        Back to Wheel
      </Link>
    </div>
  );
};

export default EditPage;
