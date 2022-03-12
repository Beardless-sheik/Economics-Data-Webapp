import './details.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCarModelsDetails } from '../../redux/reduxSlices/carModelSlice';
import returnImage from '../../images/return-icon.svg';
import ModelandMakeCarDetails from '../../components/ModelAndMakeCarDetails/modelAndMakeCarDetails';

const DetailsPage = () => {
  const carModelData = useSelector((state) => state.carModels);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const index = carModelData.carModels.findIndex(
    (element) => element.data.id === carModelData.carModelSelected,
  );
  const carName = carModelData.carModels[index].data.attributes.name;
  const carModelsAvailable = carModelData.carModels[index].data.attributes.number_of_models;
  useEffect(() => {
    dispatch(fetchCarModelsDetails(carModelData.carModelSelected));
  }, []);
  const { carModelSelectedDetails } = carModelData;

  const goBackaPageEventListener = () => {
    navigate('/');
  };

  const handleKeyDownEnter = (event) => {
    if (event.code === 'enter') {
      goBackaPageEventListener();
    }
  };

  return (
    <>
      <div className="subHeaderText">
        <div tabIndex={0} role="button" onClick={goBackaPageEventListener} onKeyDown={handleKeyDownEnter}>
          <img src={returnImage} alt="return logo to go back a page" className="returnImageLogo" />
        </div>
        <p> Estimate CARBON Data for Vehicles per 100KM </p>
      </div>
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
