import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export const addBusinessInfo = createAsyncThunk(
  'businessInfo/add',
  async ({ id, title, time, timeStamp, price, address }, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(collection(db, 'BusinessInfo'), {
        id,
        title,
        time,
        time_: timeStamp,
        price,
        address,
      });
      return { id, title, time, timeStamp, price, address };
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