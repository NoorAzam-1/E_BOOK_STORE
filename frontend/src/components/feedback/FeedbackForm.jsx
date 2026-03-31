"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeedback, updateFeedback } from "@/features/feedbackSlice";

export default function FeedbackForm({ editData, setEditData }) {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    email: "",
    contactNo: "",
    feedback: "",
  });

  useEffect(() => {
    if (editData) {
      setForm(editData);
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editData) {
      dispatch(updateFeedback({ id: editData._id, data: form }));
      setEditData(null);
    } else {
      dispatch(addFeedback(form));
    }

    setForm({
      name: "",
      email: "",
      contactNo: "",
      feedback: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded mb-6">
      <h2 className="text-xl font-bold mb-4">
        {editData ? "Edit Feedback" : "Add Feedback"}
      </h2>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        className="border p-2 w-full mb-2"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        className="border p-2 w-full mb-2"
        placeholder="Contact No"
        value={form.contactNo}
        onChange={(e) =>
          setForm({ ...form, contactNo: e.target.value })
        }
      />

      <textarea
        className="border p-2 w-full mb-2"
        placeholder="Feedback"
        value={form.feedback}
        onChange={(e) =>
          setForm({ ...form, feedback: e.target.value })
        }
      />

      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        {editData ? "Update" : "Submit"}
      </button>
    </form>
  );
}