import { Fragment } from 'react';
import './home.css';
import ModelCarDetails from '../../components/ModelCarDetails/modelCarDetails';

const Home = () => {
  const ModelArrayData = [{
    vehicleLogoSrc: 'https://c8.alamy.com/comp/D12RG7/logo-of-the-make-alfa-romeo-of-the-italian-car-manufacturer-fiat-group-D12RG7.jpg',
    carModelName: 'Alfa Romeo',
    numberOfModelsAvailable: 567,
  }, {
    vehicleLogoSrc: 'https://c8.alamy.com/comp/D12RG7/logo-of-the-make-alfa-romeo-of-the-italian-car-manufacturer-fiat-group-D12RG7.jpg',
    carModelName: 'BMW',
    numberOfModelsAvailable: 1567,
  }, {
    vehicleLogoSrc: 'https://c8.alamy.com/comp/D12RG7/logo-of-the-make-alfa-romeo-of-the-italian-car-manufacturer-fiat-group-D12RG7.jpg',
    carModelName: 'Benz',
    numberOfModelsAvailable: 5567,
  }, {
    vehicleLogoSrc: 'https://c8.alamy.com/comp/D12RG7/logo-of-the-make-alfa-romeo-of-the-italian-car-manufacturer-fiat-group-D12RG7.jpg',
    carModelName: 'Lambo',
    numberOfModelsAvailable: 55667,
  },
  {
    vehicleLogoSrc: 'https://c8.alamy.com/comp/D12RG7/logo-of-the-make-alfa-romeo-of-the-italian-car-manufacturer-fiat-group-D12RG7.jpg',
    carModelName: 'Nissan',
    numberOfModelsAvailable: 6856,
  }];
  return (
    <>
      <h1 className="mainHeaderText"> VEHICLE CARBON ESTIMATE STATS PER 100KM</h1>
      <p className="subMainHeaderText">STATS By Models</p>
      <div className="mainEstimateGrid">
        {
            ModelArrayData.map((element,index) => <ModelCarDetails {...element}/>)
        }
      </div>
    </>
  );
};

export default Home;
