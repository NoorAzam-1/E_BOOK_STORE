import feedbackModel from "../models/feedbackModel.js";

//CREATE
const addFeedback = async (req,res) => {
    try {
     const {name, email, contactNo, feedback} = req.body 
     
     if (!name || !email || !contactNo || !feedback) {
        return res.json ({success:false, message:"ALL fields are required"});
     }

     const newFeedback = new feedbackModel({name, email, contactNo, feedback,});
     await newFeedback.save();
     res.json ({success:true, message:"Feedback added successfully",data:newFeedback});
        
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
};

// READ ALL 
const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await feedbackModel.find().sort({ createdAt: -1 });

    res.json({success: true, data: feedbacks,});

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// READ SINGLE 
const getSingleFeedback = async (req, res) => {
  try {
    const { id } = req.params;

    const feedback = await feedbackModel.findById(id);

    if (!feedback) {
      return res.json({ success: false, message: "Feedback not found",});
    }

    res.json({ success: true, data: feedback,});

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// UPDATE 
const updateFeedback = async (req,res) => {
    try {
     const {id} = req.params;
     const {name, email, contactNo, feedback } = req.body;
     
     const updated = await feedbackModel.findByIdAndUpdate(id,{name, email, contactNo, feedback },{new:true});
     if (!updated) {
      return res.json({  success: false, message: "Feedback is not updated", });
    }

    res.json({success: true,message: "Feedback is updated successfully", data: updated,}); 
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });  
    }
};

// DELETE 
    const deleteFeedback = async (req, res) => {
    try {
    const { id } = req.params;

    const deleted = await feedbackModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.json({success: false, message: "Feedback is not deleted",});
    }

    res.json({ success: true,message: "Feedback deleted successfully",});
        
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });  
    }
};


export { addFeedback,getAllFeedback,getSingleFeedback,updateFeedback,deleteFeedback,};