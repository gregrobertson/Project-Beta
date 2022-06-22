import React from "react";

class ServiceForm extends React.Component {
    constructor(props) {
        super(props)
        // Setting Deafualt Value for each inout field in form -------------->
        this.state = {
            vin: '',
            customer: '',
            date: '',
            time: '',
            technician: '',
            technicians: [],
            reason: '',
        }
        // console.log(this.state);
        //-------------------------------------------------------------------->
        // this.handleVinChange = this.handleVinChange.bind(this)
        // this.handleCustomerChange = this.handleCustomerChange.bind(this)
        // this.handleDateChange = this.handleDateChange.bind(this)
        // this.handleTimeChange = this.handleTimeChange.bind(this)
        // this.handleTechnicianChange = this.handleTechnicianChange.bind(this)
        // this.handleReasonChange = this.handleReasonChange.bind(this)
        this.handleChange = this.handleChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this)

    }
    //Updating the component state with what you type/input into the form--->
    // handleVinChange(event) {
    //     const value = event.target.value;
    //     this.setState({ vin: value })
    // }
    // handleCustomerChange(event) {
    //     const value = event.target.value;
    //     this.setState({ customer: value })
    // }
    // handleDateChange(event) {
    //     const value = event.target.value;
    //     this.setState({ date: value })
    // }
    // handleTimeChange(event) {
    //     const value = event.target.value;
    //     this.setState({ time: value })
    // }
    // handleTechnicianChange(event) {
    //     const value = event.target.value;
    //     this.setState({ technician: value })
    // }
    // handleReasonChange(event) {
    //     const value = event.target.value;
    //     this.setState({ reason: value })
    // }
    handleChange(event) {
        const newState = {};
        newState[event.target.id] = event.target.value;
        this.setState(newState);
    }

    //----------------------------------------------------------------------->
    //--Handling how the form is submitted----------------------------------->
    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        /* Changing the format so that the request to the server matches what the server recieves */
        delete data.technicians;
        console.log(data);

        const serviceUrl = 'http://localhost:8080/api/service/';
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(serviceUrl, fetchConfig);
        console.log(response);
        if (response.ok) {
            const newService = await response.json();
            console.log(newService);

            // Clearing the form after submission----------------->
            const cleared = {
                vin: '',
                customer: '',
                date: '',
                time: '',
                technician: '',
                reason: '',
            }
            this.setState(cleared)
            //----------------------------------------------------->
        }
    }

    async componentDidMount() {

        const url = "http://localhost:8080/api/technician/"

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            this.setState({ technicians: data.technician })

        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="offset-3 col-6">
                        <div className="shadow p-4 mt-4">
                            <h1>New Service Appointment</h1>
                            <form onSubmit={this.handleSubmit} id="create-service-form">
                                <div className="form-floating mb-3">
                                    <input onChange={this.handleChange} value={this.state.vin} placeholder="VIN#" type="text" vin="vin" id="vin"
                                        className="form-control" />
                                    <label htmlFor="vin">VIN#</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input onChange={this.handleChange} value={this.state.customer} placeholder="Customer" type="text" name="customer" id="customer"
                                        className="form-control" />
                                    <label htmlFor="customer">Customer</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input onChange={this.handleChange} value={this.state.date} placeholder="Date" type="date" name="date" id="date"
                                        className="form-control" />
                                    <label htmlFor="date">Date</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input onChange={this.handleChange} value={this.state.time} placeholder="Time" type="time" name="time" id="time"
                                        className="form-control" />
                                    <label htmlFor="time">Time</label>
                                </div>
                                <div className="mb-3">
                                    <select onChange={this.handleChange} value={this.state.technician} id="technician" name="technician" className="form-select">
                                        <option>Choose Technician</option>
                                        {this.state.technicians.map(technician => {
                                            return (
                                                <option key={technician.id} value={technician.employee_number}>
                                                    {technician.name} : {technician.employee_number}
                                                </option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="form-floating mb-3">
                                    <input onChange={this.handleChange} value={this.state.reason} placeholder="Reason" type="text" name="reason" id="reason"
                                        className="form-control" />
                                    <label htmlFor="reason">Reason</label>
                                </div>
                                <button className="btn btn-primary">Create</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ServiceForm;