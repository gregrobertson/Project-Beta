import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import TechnicianForm from './Service/TechnicianForm';
import ServiceForm from './Service/ServiceForm';
import ServiceList from './Service/ServiceList';
import TechnicianList from './Service/TechnicianList';
import ServiceHistory from './Service/ServiceHistory';
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
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
