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
  const { attributes, id } = carModelData.carModelSelectedDetails[index].data;
  console.log(attributes, id);

  useEffect(() => {
    dispatch(fetchCarEstimateDetails(id));
  }, []);
  
  const vehcileMake = carModelData.estimateDetails.vehicle_make;
  const vehicleModel = carModelData.estimateDetails.vehicle_model;
  const carbonKG = carModelData.estimateDetails.carbon_kg;

    const goBackaPageEventListener = () => {
    navigate('/detail');
  };
  return (
    <>
      <p className="subHeaderText">
        <img src={returnImage} alt="return logo to go back a page" className="returnImageLogo" onClick={goBackaPageEventListener}/>
        Estimate CARBON Data for Vehicles per 100KM
      </p>
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
