"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllFeedback,
  deleteFeedback,
} from "@/features/feedbackSlice";
import FeedbackForm from "./FeedbackForm";

export default function FeedbackList() {
  const dispatch = useDispatch();
  const { feedbacks, loading } = useSelector(
    (state) => state.feedback
  );

  const [editData, setEditData] = useState(null);

  useEffect(() => {
    dispatch(getAllFeedback());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10">
      {/* FORM */}
      <FeedbackForm editData={editData} setEditData={setEditData} />

      {/* LIST */}
      {feedbacks.map((item) => (
        <div
          key={item._id}
          className="border p-4 mb-3 rounded shadow"
        >
          <p><b>Name:</b> {item.name}</p>
          <p><b>Email:</b> {item.email}</p>
          <p><b>Contact:</b> {item.contactNo}</p>
          <p><b>Feedback:</b> {item.feedback}</p>

          <div className="mt-2 flex gap-2">
            <button
              onClick={() => setEditData(item)}
              className="bg-yellow-400 px-3 py-1 rounded"
            >
              Edit
            </button>

            <button
              onClick={() => dispatch(deleteFeedback(item._id))}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

