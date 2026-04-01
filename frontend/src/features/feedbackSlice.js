import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {axiosInstance} from "@/utils/axios.js";

// ADD
export const addFeedback = createAsyncThunk(
  "feedback/add",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.addFeedback(data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error");
    }
  }
);

//  GET ALL
export const getAllFeedback = createAsyncThunk(
  "feedback/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.getAllFeedback();
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error");
    }
  }
);

//  GET SINGLE
export const getSingleFeedback = createAsyncThunk(
  "feedback/getOne",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.getSingleFeedback(id);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error");
    }
  }
);

//  DELETE
export const deleteFeedback = createAsyncThunk(
  "feedback/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.deleteFeedback(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error");
    }
  }
);

//  UPDATE
export const updateFeedback = createAsyncThunk(
  "feedback/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.updateFeedback(id, data);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error");
    }
  }
);

const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    feedbacks: [],
    singleFeedback: null,
    loading: false,
    error: null,
  },

  reducers: {
    clearSingleFeedback: (state) => {
      state.singleFeedback = null;
    },
  },

  extraReducers: (builder) => {
    builder

      //  GET ALL
      .addCase(getAllFeedback.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacks = action.payload;
      })
      .addCase(getAllFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //  GET SINGLE
      .addCase(getSingleFeedback.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.singleFeedback = action.payload;
      })
      .addCase(getSingleFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //  ADD
      .addCase(addFeedback.fulfilled, (state, action) => {
        state.feedbacks.unshift(action.payload.data);
      })
      .addCase(addFeedback.rejected, (state, action) => {
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteFeedback.fulfilled, (state, action) => {
        state.feedbacks = state.feedbacks.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(deleteFeedback.rejected, (state, action) => {
        state.error = action.payload;
      })

      //  UPDATE
      .addCase(updateFeedback.fulfilled, (state, action) => {
        const index = state.feedbacks.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.feedbacks[index] = action.payload;
        }
      })
      .addCase(updateFeedback.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearSingleFeedback } = feedbackSlice.actions;
export default feedbackSlice.reducer;