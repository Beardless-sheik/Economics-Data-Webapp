import './modelCarDetails.css';
import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const ModelCarDetails = (props) => {
  const navigate = useNavigate()
  const toDetailLinkPageEventlistener = () => {
    console.log('event detail listener run');
    navigate('./detail');
  };

  const handleKeyDownEnter = (event) => {
    if (event.code === 'enter') {
      toDetailLinkPageEventlistener();
    }
  };

  const {
    vehicleLogoSrc, carModelName, numberOfModelsAvailable, colour,
  } = props;
  return (
    <>
      <button className="button-container" type="button" onClick={toDetailLinkPageEventlistener} onKeyDown={handleKeyDownEnter}>
        <div className={colour ? 'estimateDiv differentColour' : 'estimateDiv'}>
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
      </button>
    </>
  );
};

ModelCarDetails.propTypes = {
  vehicleLogoSrc: PropTypes.string.isRequired,
  carModelName: PropTypes.string.isRequired,
  numberOfModelsAvailable: PropTypes.number.isRequired,
  colour: PropTypes.string,
};

ModelCarDetails.defaultProps = {
  colour: '',
};

export default ModelCarDetails;
