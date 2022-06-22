import React from "react";

class CustomerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      phoneNumber: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    data.phone_number = data.phoneNumber;
    delete data.phoneNumber;

    const nameUrl = "http://localhost:8090/api/customers/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(nameUrl, fetchConfig);
    if (response.ok) {
      const cleared = {
        name: "",
        address: "",
        phoneNumber: "",
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
            <h1>Add a Customer</h1>
            <form onSubmit={this.handleSubmit} id="create-salesperson-form">
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleChange}
                  value={this.state.name}
                  placeholder="Customer Name"
                  required
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                />
                <label htmlFor="name">Customer Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleChange}
                  value={this.state.address}
                  placeholder="Address"
                  required
                  type="text"
                  name="address"
                  id="address"
                  className="form-control"
                />
                <label htmlFor="address">Address</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleChange}
                  value={this.state.phoneNumber}
                  placeholder="Phone Number"
                  required
                  type="number"
                  name="phoneNumber"
                  id="phoneNumber"
                  className="form-control"
                />
                <label htmlFor="phone_number">Phone Number</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerForm;
