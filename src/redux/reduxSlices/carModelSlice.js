import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const retrieveCarModelsAPI = 'https://www.carboninterface.com/api/v1/vehicle_makes';

export const fetchCarModels = createAsyncThunk(
  'carModels/getCarModels',
  async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        Accept: 'text/json',
        Authorization: 'Bearer FSwkEcLz7o1r1KYMC9TEw',
      },
      mode: 'cors',
      cache: 'default',
    };
    const response = await fetch(retrieveCarModelsAPI, requestOptions);
    const data = await response.json();
    console.log(data);
    return data;
  },
);

const initialState = {
  carModels: [],
  loading: false,
};
const carModelSlice = createSlice({
  name: 'carModels',
  initialState,
  extraReducers: { [fetchCarModels.fulfilled]: (state, action) => [...action.payload] },
});

export default carModelSlice.reducer;
