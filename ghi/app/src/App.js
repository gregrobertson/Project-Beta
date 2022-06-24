import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';

import TechnicianForm from './Service/TechnicianForm';
import ServiceForm from './Service/ServiceForm';
import ServiceList from './Service/ServiceList';
import TechnicianList from './Service/TechnicianList';
import ServiceHistory from './Service/ServiceHistory';

import SalesPersonForm from "./Sales/SalesPersonForm";
import CustomerForm from "./Sales/CustomerForm";
import SalesForm from "./Sales/SalesForm";
import SalesList from "./Sales/SalesList";
import SalesHistoryList from "./Sales/SalesHistoryList";

import ManufacturerList from "./Inventory/ManufacturerList";
import ManufacturerForm from "./Inventory/ManufacturerForm";
import AutomobileList from "./Inventory/AutomobileList";
import AutomobileForm from "./Inventory/AutomobileForm";
import VehicleList from "./Inventory/VehicleList";
import VehicleForm from "./Inventory/VehicleForm";

import React from 'react';




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    Promise.all([
      fetch('http://localhost:8080/api/service/'),
      fetch('http://localhost:8080/api/technician/'),
      fetch('http://localhost:8080/api/service/history'),

    ])

      //------------------------------------------>
      .then(([service, technician, history]) => {
        return Promise.all([
          service.json(),
          technician.json(),
          history.json(),
        ])
      })

      .then(([service, technician, history]) => {
        this.setState(service)
        this.setState(technician)
        this.setState(history)

      })

  }
  render() {
    return (
      <BrowserRouter>
        <Nav />
        <div className="container">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="technician">
              <Route path="new" element={<TechnicianForm />} />
              <Route path="" element={<TechnicianList technicians={this.state.technicians} />} />
            </Route>
            <Route path="service">
              <Route path="new" element={<ServiceForm />} />
              <Route path="" element={<ServiceList services={this.state.services} />} />
              <Route path="history" element={<ServiceHistory history={this.state.history} />} />
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
              <Route index element={<SalesPersonForm />} />
            </Route>
            <Route path="customer">
              <Route path="" element={<CustomerForm />} />
            </Route>
            <Route path="sales">
              <Route path="" element={<SalesForm />} />
              <Route
                path="list"
                element={<SalesList salespersons={this.props.salespersons} />}
              />
              <Route
                path="history"
                element={
                  <SalesHistoryList
                    salespersons={this.props.salespersons}
                    salesreps={this.props.salesreps}
                  />
                }
              />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
