import express from "express";
import {
  addFeedback,
  getAllFeedback,
  getSingleFeedback,
  updateFeedback,
  deleteFeedback,
} from "../controllers/feedbackController.js";

const feedbackRouter = express.Router();

feedbackRouter.post("/add", addFeedback);
feedbackRouter.get("/all", getAllFeedback);
feedbackRouter.get("/:id", getSingleFeedback); 
feedbackRouter.put("/update/:id", updateFeedback);
feedbackRouter.delete("/delete/:id", deleteFeedback);

export default feedbackRouter;