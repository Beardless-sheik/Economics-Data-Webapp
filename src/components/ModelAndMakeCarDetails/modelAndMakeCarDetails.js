import './modelAndMakeCarDetails.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addModelSelectedForestimate } from '../../redux/reduxSlices/carModelSlice';

const ModelandMakeCarDetails = (props) => {
  const {
    vehicleName, vehicleMake, vehicleYearManufacture, vehicleId,
  } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const moveUserToEstimatedetailsEventListener = (event) => {
    console.log('event listener runs: vehicle ID:', event.target.id);
    dispatch(addModelSelectedForestimate(event.target.id));
    navigate('./estimate');
  };

  return (
    <div className="gridMakeCarDetailsContainer">
      <p>
        {vehicleName}
      </p>
      <p>
        {vehicleMake}
      </p>
      <p>
        {vehicleYearManufacture}
      </p>
      <button type="button" className="viewEstimateButton" id={vehicleId} onClick={moveUserToEstimatedetailsEventListener}>
        View Estimate
      </button>
    </div>
  );
};

ModelandMakeCarDetails.propTypes = {
  vehicleName: PropTypes.string.isRequired,
  vehicleMake: PropTypes.string.isRequired,
  vehicleYearManufacture: PropTypes.number.isRequired,
  vehicleId: PropTypes.string.isRequired,
};

export default ModelandMakeCarDetails;
