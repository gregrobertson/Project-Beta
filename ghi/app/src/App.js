import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalespersonForm from "./sales/SalespersonForm";
import CustomerForm from "./sales/CustomerForm";
import SalesForm from "./sales/SalesForm";
import SalesList from "./sales/SalesList";
import SalesHistoryList from "./sales/SalesHistoryList";

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="appointments">
            <Route index element={<AppointmentList />} />
            <Route path="create/" element={<AppointmentForm />} />
            <Route path="history/" element={<AppointmentHistory />} />
          </Route>
          <Route path="technicians">
            <Route index element={<TechnicianForm />} />
          </Route>
          <Route path="manufacturers">
            <Route index element={<ManufacturerList />} />
            <Route path="create/" element={<ManufacturerForm />} />
          </Route>
          <Route path="automobiles">
            <Route index element={<AutomobileList />} />
            <Route path="create" element={<AutomobileForm />} />
          </Route>
          <Route path="vehicles">
            <Route index element={<VehicleList />} />
            <Route path="create" element={<VehicleForm />} />
          </Route>
          <Route path="salesperson">
            <Route index element={<SalespersonForm />} />
          </Route>
          <Route path="customer">
            <Route path="" element={<CustomerForm />} />
          </Route>
          <Route path="sales">
            <Route path="" element={<SalesForm />} />
            <Route
              path="list"
              element={<SalesList salespersons={props.salespersons} />}
            />
            <Route
              path="history"
              element={
                <SalesHistoryList
                  salespersons={props.salespersons}
                  salesreps={props.salesreps}
                />
              }
            />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
