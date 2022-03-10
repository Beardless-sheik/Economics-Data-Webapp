import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import DeatailsPage from './pages/details/details';
import Home from './pages/home/home';

function App() {
  return (
    <>
      <h1 className="mainHeaderText"> VEHICLE CARBON ESTIMATE STATS PER 100KM</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="detail" element={<DeatailsPage />} />
      </Routes>
    </>

  );
}

export default App;
