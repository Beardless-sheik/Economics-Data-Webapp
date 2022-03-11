import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCarModels = createAsyncThunk(
  'carModels/getCarModels',
  async () => {
    const retrieveCarModelsAPI = 'https://www.carboninterface.com/api/v1/vehicle_makes';
    const requestOptions = {
      method: 'GET',
      headers: {
        Accept: 'text/json',
        Authorization: `Bearer ${process.env.REACT_APP_CARBON_API_KEY}`,
      },
      mode: 'cors',
      cache: 'default',
    };
    const response = await fetch(retrieveCarModelsAPI, requestOptions);
    const data = await response.json();
    return data;
  },
);

export const fetchCarModelsDetails = createAsyncThunk(
  'carModels/getCarModelDetails',
  async (carModelSelectedId) => {
    const retrieveCarModelDetailsAPI = `https://www.carboninterface.com/api/v1/vehicle_makes/${carModelSelectedId}/vehicle_models`;
    const requestOptions = {
      method: 'GET',
      headers: {
        Accept: 'text/json',
        Authorization: `Bearer ${process.env.REACT_APP_CARBON_API_KEY}`,
      },
      mode: 'cors',
      cache: 'default',
    };
    const response = await fetch(retrieveCarModelDetailsAPI, requestOptions);
    const data = await response.json();
    return (data);
  },
);

const initialState = {
  carModels: [],
  loading: false,
  carModelSelected: '',
  carModelSelectedDetails: [],
};
const carModelSlice = createSlice({
  name: 'carModels',
  initialState,
  reducers: {
    addCarModelSelected(state, action) {
      const copyState = state;
      copyState.carModelSelected = action.payload;
    },
  },
  extraReducers: {
    [fetchCarModels.fulfilled]: (state, action) => (
      { ...state, carModels: action.payload }),
    [fetchCarModelsDetails.fulfilled]: (state, action) => (
      { ...state, carModelSelectedDetails: action.payload }),
  },
});

export const { addCarModelSelected } = carModelSlice.actions;
export default carModelSlice.reducer;
