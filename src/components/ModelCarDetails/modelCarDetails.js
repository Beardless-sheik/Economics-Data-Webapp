import './modelCarDetails.css';
import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCarModelSelected } from '../../redux/reduxSlices/carModelSlice';

const ModelCarDetails = (props) => {
  const {
    vehicleLogoSrc, carModelName, numberOfModelsAvailable, colour, modelId,
  } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toDetailLinkPageEventlistener = () => {
    dispatch(addCarModelSelected(modelId));
    navigate('./detail');
  };

  const handleKeyDownEnter = (event) => {
    if (event.code === 'enter') {
      toDetailLinkPageEventlistener();
    }
  };

  return (
    <>
      <button className="button-container" type="button" onClick={toDetailLinkPageEventlistener} onKeyDown={handleKeyDownEnter} id={modelId}>
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
  vehicleLogoSrc: PropTypes.string,
  carModelName: PropTypes.string.isRequired,
  numberOfModelsAvailable: PropTypes.number.isRequired,
  colour: PropTypes.string,
  modelId: PropTypes.string.isRequired,
};

ModelCarDetails.defaultProps = {
  colour: '',
  vehicleLogoSrc: 'http://placehold.jp/3d4070/dfd8d8/250x250.png?text=No%20Logo%20Available',
};

export default ModelCarDetails;
