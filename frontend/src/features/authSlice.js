    import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
    import axiosInstance from "../utils/axios.js";

    // 🔐 REGISTER
    export const registerUser = createAsyncThunk(
    "auth/register",
    
    async (data, { rejectWithValue }) => {
        console.log("registerUser inside")  
        try {
        const res = await axiosInstance.register(data);
        return res.data;
        } catch (error) {
        return rejectWithValue(error.response?.data || "Error");
        }
    }
    );

    // 🔐 LOGIN
    export const loginUser = createAsyncThunk(
    "auth/login",
    async (data, { rejectWithValue }) => {
        try {
        const res = await axiosInstance.login(data);
        return res.data;
        } catch (error) {
        return rejectWithValue(error.response?.data || "Error");
        }
    }
    );

    // 👤 PROFILE
    export const getProfile = createAsyncThunk(
    "auth/profile",
    async (_, { rejectWithValue }) => {
        try {
        const res = await axiosInstance.getProfile();
        return res.data;
        } catch (error) {
        return rejectWithValue(error.response?.data || "Error");
        }
    }
    );

    // forgotPassword
    export const forgotPassword = createAsyncThunk(
    "auth/forgotPassword",
    async (_, { rejectWithValue }) => {
        try {
        const res = await axiosInstance.forgotPassword();
        return res.data;
        } catch (error) {
        return rejectWithValue(error.response?.data || "Error");
        }
    }
    );



    const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {
        logoutUser: (state) => {
        state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
        // REGISTER
        .addCase(registerUser.pending, (state,action) => {
            state.loading = true;
        })
        .addCase(registerUser.fulfilled, (state,action) => {
            state.loading = false;
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // LOGIN
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // PROFILE
        .addCase(getProfile.fulfilled, (state, action) => {
            state.user = action.payload;
        });
    },
    });

    export const { logoutUser } = authSlice.actions;
    export default authSlice.reducer;
