import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import backend_URL from "../../API/API";
import axios from "axios";

const initialState = {
    channel: null,
    isLoading: false,
    isError: false,
    error: null,
    isSuccess: false,
    uploadProgress: 0
};

export const createChannel = createAsyncThunk(
    "channel/create",
    async ({formData,userId}, { rejectWithValue, getState }) => {
        try {
            const token = getState()?.user?.token || localStorage.getItem('token');

            console.log(token)
            
            const response = await axios.post(
                `${backend_URL}/${userId}/create-channel`, 
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    },
                    withCredentials: true,
                    onUploadProgress: (progressEvent) => {
                        const progress = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        return progress;
                    }
                }
            );
            return response.data;
        } catch (err) {
            return rejectWithValue({
                message: err.response?.data?.message || err.message,
                status: err.response?.status,
                data: err.response?.data
            });
        }
    }
);

const channelSlice = createSlice({
    name: "channel",
    initialState,
    reducers: {
        resetChannelState: () => {
            return { ...initialState }; //here i got the error
        },
        setUploadProgress: (state, action) => {
            state.uploadProgress = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createChannel.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = null;
                state.isSuccess = false;
                state.uploadProgress = 0;
            })
            .addCase(createChannel.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.channel = action.payload;
                state.isSuccess = true;
                state.uploadProgress = 100;
                state.error = null;
            })
            .addCase(createChannel.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
                state.isSuccess = false;
                state.uploadProgress = 0;
            });
    }
});

export const { resetChannelState, setUploadProgress } = channelSlice.actions;

export default channelSlice.reducer;