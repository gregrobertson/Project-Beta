import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import TechnicianForm from './Service/TechnicianForm';
import ServiceForm from './Service/ServiceForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="technician">
            <Route path="new" element={<TechnicianForm />} />
            {/* <Route path="" element={<TechnicianList />} /> */}
          </Route>
          <Route path="service">
            <Route path="new" element={<ServiceForm />} />
            {/* <Route path="" element={<ServiceList />} /> */}
            {/* <Route path="history" element={<ServiceHistory />} /> */}
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
