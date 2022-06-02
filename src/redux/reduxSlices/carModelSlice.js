import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import carLogos from '../../components/constants/ImageConstants';

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
    data.forEach((car) => {
      carLogos.forEach((carLogo) => {
        if (Object.prototype.hasOwnProperty.call(carLogo, car.data.attributes.name)) {
          // eslint-disable-next-line no-param-reassign
          car.data.attributes.sourceLogoUrl = carLogo[car.data.attributes.name];
        }
      });
    });
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

export const fetchCarEstimateDetails = createAsyncThunk(
  'carModels/fetchCarEstimateDetails',
  async (carModelSelectedForEstimate) => {
    const carEstimateAPI = 'https://www.carboninterface.com/api/v1/estimates';
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_CARBON_API_KEY}`,
      },
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify({
        type: 'vehicle',
        distance_unit: 'km',
        distance_value: 100,
        vehicle_model_id: carModelSelectedForEstimate,
      }),
    };
    const response = await fetch(carEstimateAPI, requestOptions);
    const data = await response.json();
    return data.data.attributes;
  },
);

const initialState = {
  carModels: [],
  loading: false,
  carModelSelected: '',
  carModelSelectedLogoImage: '',
  carModelSelectedDetails: [],
  carModelSelectedForEstimate: '',
  estimateDetails: '',
  filteredData: '',
};
const carModelSlice = createSlice({
  name: 'carModels',
  initialState,
  reducers: {
    addCarModelSelected(state, action) {
      const copyState = state;
      copyState.carModelSelected = action.payload;
    },
    addCarModelSelectedLogo(state, action) {
      const copyState = state;
      copyState.carModelSelectedLogoImage = action.payload;
    },
    addModelSelectedForestimate(state, action) {
      const copyState = state;
      copyState.carModelSelectedForEstimate = action.payload;
    },
    addFiltereddata(state, action) {
      const copyState = state;
      copyState.carModels = action.payload;
    },
  },
  extraReducers: {
    [fetchCarModels.fulfilled]: (state, action) => (
      { ...state, carModels: action.payload }),
    [fetchCarModelsDetails.fulfilled]: (state, action) => (
      { ...state, carModelSelectedDetails: action.payload }),
    [fetchCarEstimateDetails.fulfilled]: (state, action) => (
      { ...state, estimateDetails: action.payload }),
  },
});

export const {
  addCarModelSelected, addModelSelectedForestimate, addFiltereddata, addCarModelSelectedLogo,
} = carModelSlice.actions;
export default carModelSlice.reducer;
