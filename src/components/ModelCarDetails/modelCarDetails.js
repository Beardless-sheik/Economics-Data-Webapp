import './modelCarDetails.css';
import { Fragment } from 'react';
import PropTypes from 'prop-types';

const ModelCarDetails = (props) => {
  const { vehicleLogoSrc, carModelName, numberOfModelsAvailable } = props;
  return (
    <>
      <div className="estimateDiv">
        <div className="imageLogoContainer">
          <img alt="vehicle logo" className="logoImage" src={vehicleLogoSrc} />
        </div>
        <p className="carModelDescriptionText">
          {carModelName}
        </p>
        <p className="carModelDescriptionText sizeOfNumberText">
          {numberOfModelsAvailable}
        </p>
      </div>
    </>
  );
};

ModelCarDetails.propTypes = {
  vehicleLogoSrc: PropTypes.string.isRequired,
  carModelName: PropTypes.string.isRequired,
  numberOfModelsAvailable: PropTypes.number.isRequired,
};

export default ModelCarDetails;
