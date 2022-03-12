import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import returnImage from '../../images/return-icon.svg';
import { fetchCarEstimateDetails } from '../../redux/reduxSlices/carModelSlice';
import './estimateDetails.css';

const EstimateDetailsPage = () => {
  const carModelData = useSelector((state) => state.carModels);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const index = carModelData.carModelSelectedDetails.findIndex(
    (element) => element.data.id === carModelData.carModelSelectedForEstimate,
  );
  const { id } = carModelData.carModelSelectedDetails[index].data;

  useEffect(() => {
    dispatch(fetchCarEstimateDetails(id));
  }, []);

  const vehcileMake = carModelData.estimateDetails.vehicle_make;
  const vehicleModel = carModelData.estimateDetails.vehicle_model;
  const carbonKG = carModelData.estimateDetails.carbon_kg;

  const goBackaPageEventListener = () => {
    navigate('/detail');
  };

  const handleKeyDownEnter = (event) => {
    if (event.code === 'enter') {
      goBackaPageEventListener();
    }
  };

  return (
    <>
      <div className="subHeaderText">
        <div tabIndex={0} role="button" onKeyDown={handleKeyDownEnter} onClick={goBackaPageEventListener}>
          <img src={returnImage} alt="return logo to go back a page" className="returnImageLogo" />
        </div>
        <p> Estimate CARBON Data for Vehicles per 100KM </p>
      </div>
      <p className="vehicleEstimateText">
        The estimate per 100KM of
        {' '}
        {vehcileMake}
        {' '}
        {vehicleModel}
        {' '}
        is
        {' '}
        {carbonKG}
        {' '}
        (carbon: KG) per 100Km covered.
      </p>
      <div />
    </>
  );
};

export default EstimateDetailsPage;
