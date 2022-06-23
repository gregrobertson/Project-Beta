import React from "react";

class SalesPersonForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      employeeNumber: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    data.employee_number = data.employeeNumber;
    delete data.employeeNumber;

    const nameUrl = "http://localhost:8090/api/salespersons/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(nameUrl, fetchConfig);
    if (response.ok) {
      const newName = await response.json();
      const cleared = {
        name: "",
        employeeNumber: "",
      };
      this.setState(cleared);
    }
  }

  handleChange(event) {
    const newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a Salesperson</h1>
            <form onSubmit={this.handleSubmit} id="create-salesperson-form">
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleChange}
                  value={this.state.name}
                  placeholder="Salesperson Name"
                  required
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                />
                <label htmlFor="name">Salesperson Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleChange}
                  value={this.state.employeeNumber}
                  placeholder="Employee Number"
                  required
                  type="number"
                  name="employeeNumber"
                  id="employeeNumber"
                  className="form-control"
                />
                <label htmlFor="employee_number">Employee Number</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SalesPersonForm;
