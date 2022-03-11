import './modelAndMakeCarDetails.css';
import PropTypes from 'prop-types';

const ModelandMakeCarDetails = (props) => {
  const {
    vehicleName, vehicleMake, vehicleYearManufacture, vehicleId,
  } = props;
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
      <button type="button" className="viewEstimateButton" id={vehicleId}>
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
