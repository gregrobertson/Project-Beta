import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid" id="work">
        <NavLink className="navbar-brand" to="/">
          Piss Excellence
        </NavLink>
        <div className="p-2 dropdown">
          <NavLink
            className="btn btn-secondary dropdown-toggle"
            to="#"
            role="button"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Inventory
          </NavLink>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <NavLink className="dropdown-item" to="/manufacturers/">
              Show Manufacturers
            </NavLink>
            <NavLink className="dropdown-item" to="/manufacturers/create/">
              Create Manufacturer
            </NavLink>
            <NavLink className="dropdown-item" to="/automobiles/">
              Show Automobiles
            </NavLink>
            <NavLink className="dropdown-item" to="/automobiles/create/">
              Create Automobiles
            </NavLink>
            <NavLink className="dropdown-item" to="/vehicles/">
              Show Vehicle Models
            </NavLink>
            <NavLink className="dropdown-item" to="/vehicles/create/">
              Create Vehicle Model
            </NavLink>
          </div>
        </div>
        <div className="p-2 dropdown">
          <NavLink
            className="btn btn-secondary dropdown-toggle"
            to="#"
            role="button"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Services
          </NavLink>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <NavLink className="dropdown-item" to="/service/new">
              Create Service
            </NavLink>
            <NavLink className="dropdown-item" to="/service/">
              Service List
            </NavLink>
            <NavLink className="dropdown-item" to="/service/history/">
              Service History
            </NavLink>
            <NavLink className="dropdown-item" to="/technician/new">
              Create Technician
            </NavLink>
            <NavLink className="dropdown-item" to="/technician/">
              Technicians
            </NavLink>
          </div>
        </div >
        <div className="p-2 dropdown">
          <NavLink
            className="btn btn-secondary dropdown-toggle"
            to="#"
            role="button"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Sales
          </NavLink>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <NavLink className="dropdown-item" to="/salesperson">
              New Sales Person
            </NavLink >
            <NavLink className="dropdown-item" to="/customer">
              New Customer
            </NavLink>
            <NavLink className="dropdown-item" to="/sales">
              New Sales Record
            </NavLink>
            <NavLink className="dropdown-item" to="/sales/list">
              Sales List
            </NavLink>
            <NavLink className="dropdown-item" to="/sales/history">
              Sales Person History
            </NavLink >
          </div >
        </div >
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"></li>
          </ul>
        </div>
      </div >
    </nav>
  );
}

export default Nav;