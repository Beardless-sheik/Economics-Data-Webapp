import './App.css';
import { Routes, Route } from 'react-router-dom';
import DeatailsPage from './pages/details/details';
import EstimateDetailsPage from './pages/estimateDetails/estimateDetails';
import Home from './pages/home/home';

function App() {
  return (
    <>
      <h1 className="mainHeaderText"> VEHICLE CARBON ESTIMATE STATS PER 100KM</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail" element={<DeatailsPage />} />
        <Route path="/detail/estimate" element={<EstimateDetailsPage />} />
      </Routes>
    </>

  );
}

export default App;
