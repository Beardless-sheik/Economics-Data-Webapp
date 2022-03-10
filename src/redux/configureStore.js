import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import carModelsReducer from './reduxSlices/carModelSlice';

const store = configureStore({
  reducer: {
    carModels: carModelsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
