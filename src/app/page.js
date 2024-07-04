"use client";

import React, { useState } from "react";
import useFirestoreStore from "@/store/firestore";
import { db } from "@/config/firebase";
export default function Home() {
  const { documents, isLoading, error, addDocument, getDocuments } =
    useFirestoreStore();
  const [formData, setFormData] = useState({ name: "", age: "" });

  const handleAddDocument = async () => {
    if (!formData.name || !formData.age) {
      alert("Please fill in all fields");
      return;
    }
    await addDocument("users", {
      name: formData.name,
      age: parseInt(formData.age, 10),
    });
    setFormData({ name: "", age: "" }); // Reset form
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            className="text-black"
          />
        </label>
        <button type="button" onClick={handleAddDocument}>
          Add User
        </button>
      </form>
    </div>
  );
}
