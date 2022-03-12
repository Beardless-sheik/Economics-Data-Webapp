import store from '../redux/configureStore';
import { addCarModelSelected, addModelSelectedForestimate, addFiltereddata } from '../redux/reduxSlices/carModelSlice';
// import { useDispatch } from 'react-redux';

// const dispatch = useDispatch();

describe('Games redux state tests', () => {
  it('Should initially set carModels to an empty object before pulling from API', () => {
    const state = store.getState().carModels;
    expect(state.carModels).toEqual([]);
  });

  it('should equal action creator with type: "carModels/addModelSelectedForestimate"', () => {
    expect(addModelSelectedForestimate('example1').type).toEqual('carModels/addModelSelectedForestimate');
    expect(addModelSelectedForestimate('example1').payload).toEqual('example1');
  });

  it('should equal action creator with type: "carModels/addCarModelSelected"', () => {
    expect(addCarModelSelected('example1').type).toEqual('carModels/addCarModelSelected');
    expect(addCarModelSelected('example1').payload).toEqual('example1');
  });

  it('should equal action creator with type: "carModels/addFiltereddata"', () => {
    expect(addFiltereddata('example1').type).toEqual('carModels/addFiltereddata');
    expect(addFiltereddata('example1').payload).toEqual('example1');
  });
});
