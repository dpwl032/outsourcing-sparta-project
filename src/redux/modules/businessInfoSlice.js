import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const sendDataToServer = async ({ id, title, time, price, address }) => {
  try {
    const response = await axios.post('http://localhost:5000/businessInfo', {
      id,
      title,
      time,
      price,
      address,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addBusinessInfo = createAsyncThunk(
  'businessInfo/add',
  async ({ id, title, time, price, address }, { rejectWithValue }) => {
    try {
      await sendDataToServer({ id, title, time, price, address });
      return { id, title, time, price, address };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const businessInfoSlice = createSlice({
  name: 'businessInfo',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addBusinessInfo.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(addBusinessInfo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(addBusinessInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default businessInfoSlice.reducer;