import './details.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCarModelsDetails } from '../../redux/reduxSlices/carModelSlice';

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

ModelandMakeCarDetails.prototypes = {
  vehicleName: PropTypes.string.isRequired,
  vehicleMake: PropTypes.string.isRequired,
  vehicleYearManufacture: PropTypes.string.isRequired,
  vehicleId: PropTypes.string.isRequired,
};

const DetailsPage = () => {
  const carModelData = useSelector((state) => state.carModels);
  const dispatch = useDispatch();
  const index = carModelData.carModels.findIndex(
    (element) => element.data.id === carModelData.carModelSelected,
  );
  const carName = carModelData.carModels[index].data.attributes.name;
  const carModelsAvailable = carModelData.carModels[index].data.attributes.number_of_models;
  useEffect(() => {
    dispatch(fetchCarModelsDetails(carModelData.carModelSelected));
  }, []);
  const { carModelSelectedDetails } = carModelData;
  console.log(carModelSelectedDetails);
  return (
    <>
      <p className="subHeaderText">Estimate CARBON Data for Vehicles per 100KM</p>
      <div className="headerContainer">
        <img className="headerLogoImage" alt="logo of car model selected" src="https://c8.alamy.com/comp/D12RG7/logo-of-the-make-alfa-romeo-of-the-italian-car-manufacturer-fiat-group-D12RG7.jpg" />
        <div className="hederTextContainer">
          <p>
            {carName}
          </p>
          <p>
            {carModelsAvailable}
          </p>
        </div>
      </div>
      <div className="modelMakeDetailsContainer">
        {carModelSelectedDetails.map((element) => (
          <ModelandMakeCarDetails
            key={element.data.id}
            vehicleId={element.data.id}
            vehicleName={element.data.attributes.name}
            vehicleMake={element.data.attributes.vehicle_make}
            vehicleYearManufacture={element.data.attributes.year}
          />
        ))}
      </div>

    </>
  );
};
export default DetailsPage;
