import React from "react";
import { Navigate } from "react-router-dom";
import Timer from "../Timer/Timer";

class SalesForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      automobile: "",
      salesPerson: "",
      customer: "",
      price: "",
      salesPersons: [],
      autos: [],
      customers: [],
      hasSubmitted: false,
      navigate: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const salesUrl = "http://localhost:8090/api/salespersons/";
    const customerUrl = "http://localhost:8090/api/customers/";
    const autoUrl = "http://localhost:8100/api/automobiles/";
    const soldUrl = "http://localhost:8090/api/sales/";

    const salesResponse = await fetch(salesUrl);
    const customerResponse = await fetch(customerUrl);
    const autoResponse = await fetch(autoUrl);
    const soldResponse = await fetch(soldUrl);

    if (
      autoResponse.ok &&
      customerResponse.ok &&
      autoResponse.ok &&
      soldResponse.ok
    ) {
      const saleData = await salesResponse.json();
      const customerData = await customerResponse.json();
      const autoData = await autoResponse.json();
      const soldData = await soldResponse.json();

      const notSold = autoData.autos;
      const soldCars = soldData.sales;

      const soldVins = soldCars.reduce((accum, soldCar) => {
        accum[soldCar.automobile] = true;
        return accum;
      }, {});
      const filteredCars = notSold.filter((unsold) => !soldVins[unsold.vin]);

      this.setState({
        salesPersons: saleData.salespersons,
        customers: customerData.customers,
        autos: filteredCars,
      });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    data.sales_person = data.salesPerson;
    delete data.salesPersons;
    delete data.salesPerson;
    delete data.customers;
    delete data.autos;
    delete data.hasSubmitted;
    delete data.navigate;

    const salesHistoryUrl = "http://localhost:8090/api/sales/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(salesHistoryUrl, fetchConfig);
    if (response.ok) {
      const newSales = await response.json();
      const cleared = {
        salesPerson: "",
        automobile: "",
        customer: "",
        price: "",
        hasSubmitted: true,
      };
      this.setState(cleared);
      setTimeout(() => this.setState({ navigate: true }), 15000);
    }
  }

  handleChange(event) {
    const newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

  render() {
    let messageClasses = "alert alert-success d-none mb-3";
    let rtMsg = "alert alert-secondary d-none mb-3";
    let makeNew = "px-2 btn btn-primary d-none btn-lg active";
    let formClasses = "";
    let countDown = "";

    if (this.state.hasSubmitted) {
      messageClasses = "alert alert-success mb-3";
      rtMsg = "alert alert-secondary mb-3";
      formClasses = "d-none";
      makeNew = "btn btn-primary btn-lg active mb-3";
      countDown = <Timer count={10} />;
    }

    if (this.state.navigate) {
      return <Navigate to="/sales/list" />;
    }

    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Record a new sale</h1>
            <form
              onSubmit={this.handleSubmit}
              className={formClasses}
              id="create-sales-form"
            >
              <div className="mb-3">
                <select
                  onChange={this.handleChange}
                  value={this.state.automobile}
                  required
                  name="automobile"
                  id="automobile"
                  className="form-select"
                >
                  <option value="">Choose an automobile</option>
                  {
                    console.log(this.state.autos)
                  }
                  {this.state.autos
                  .filter(automobile => automobile.sold === "false")
                  .map((auto) => {
                    return (
                      <option key={auto.href} value={auto.vin}>
                        {auto.year} {auto.color} {auto.model.manufacturer.name}{" "}
                        {auto.model.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="mb-3">
                <select
                  onChange={this.handleChange}
                  value={this.state.salesPerson}
                  required
                  name="salesPerson"
                  id="salesPerson"
                  className="form-select"
                >
                  <option value="">Choose a sales person</option>
                  {this.state.salesPersons.map((salesperson) => {
                    return (
                      <option key={salesperson.name} value={salesperson.name}>
                        {salesperson.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="mb-3">
                <select
                  onChange={this.handleChange}
                  value={this.state.customer}
                  required
                  name="customer"
                  id="customer"
                  className="form-select"
                >
                  <option value="">Choose a customer</option>

                  {this.state.customers.map((customer) => {
                    return (
                      <option key={customer.id} value={customer.name}>
                        {customer.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleChange}
                  value={this.state.price}
                  placeholder="Sale price"
                  required
                  type="number"
                  name="price"
                  id="price"
                  className="form-control"
                />
                <label htmlFor="price">Sale price</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
            <div className={messageClasses} id="success-message">
              You've submitted a sales record!
            </div>
            <div className="d-flex justify-content-center">
              <a
                href="/sales"
                className={makeNew}
                role="button"
                aria-pressed="true"
              >
                Add Another Record
              </a>
            </div>
            <div className={rtMsg}>
              Redirect to sales list in {countDown} seconds...
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SalesForm;
