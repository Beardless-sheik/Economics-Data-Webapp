import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const retrieveCarModelsAPI = 'https://www.carboninterface.com/api/v1/vehicle_makes';

export const fetchCarModels = createAsyncThunk(
  'carModels/getCarModels',
  async () => {
    console.log(process.env.REACT_APP_CARBON_API_KEY);
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

// export const fetchCarModelsDetails = createAsyncThunk(
//   'carModels/getCarModelDetails',
//   async () => {
//     const requestOptions = {
//       method: 'GET',
//       headers: {
//         Accept: 'text/json',
//         Authorization: 'Bearer FSwkEcLz7o1r1KYMC9TEw',
//       },
//       mode: 'cors',
//       cache: 'default',
//     };
//     const response = await fetch(,requestOptions)
//   },
// );

const initialState = {
  carModels: [],
  loading: false,
  carModelSelected: '',
};
const carModelSlice = createSlice({
  name: 'carModels',
  initialState,
  reducers: {
    addCarModelSelected(state, action) {
      state.carModelSelected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarModels.fulfilled, (state, action) => (
        { ...state, carModels: action.payload }));
  },
});

export const { addCarModelSelected } = carModelSlice.actions;
export default carModelSlice.reducer;
