import { configureStore } from '@reduxjs/toolkit';
import carModelsReducer from './reduxSlices/carModelSlice';

const store = configureStore({
  reducer: {
    carModels: carModelsReducer,
  },
});

export default store;
