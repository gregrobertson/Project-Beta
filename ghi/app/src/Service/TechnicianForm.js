import React from "react";

class TechnicianForm extends React.Component {
    constructor(props) {
        super(props);

        // Setting Deafault Value for each inout field in form -------------->
        this.state = {
            technicianName: '',
            employeeNumber: '',
        }
        //-------------------------------------------------------------------->
        this.handleTechnicianNameChange = this.handleTechnicianNameChange.bind(this)
        this.handleEmployeeNumberChange = this.handleEmployeeNumberChange.bind(this)
    }

    //Updating the component state with what you type/input into the form--->
    handleTechnicianNameChange(event) {
        const value = event.target.value;
        this.setState({ technicianName: value })
    }
    handleEmployeeNumberChange(event) {
        const value = event.target.value;
        this.setState({ employeeNumber: value })
    }
    //----------------------------------------------------------------------->


    //--Handling how the form is submitted----------------------------------->
    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        /* Changing the format so that the request to the server matches what the server recieves */
        data.technician_name = data.technicianName;
        data.employee_number = data.employeeNumber;
        delete data.technicianName;
        delete data.employeeNumber;
        console.log(data);

        const technicianUrl = 'http://localhost:8080/api/technician/';
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(technicianUrl, fetchConfig);
        console.log(response);
        if (response.ok) {
            const newTechnician = await response.json();
            console.log(newTechnician);

            // Clearing the form after submission----------------->
            const cleared = {
                technicianName: '',
                employeeNumber: '',
            }
            this.setState(cleared)
            //----------------------------------------------------->
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="offset-3 col-6">
                        <div className="shadow p-4 mt-4">
                            <h1>New Technician</h1>
                            <form onSubmit={this.handleSubmit} id="create-technician-form">
                                <div className="form-floating mb-3">
                                    <input onChange={this.handleTechnicianNameChange} value={this.state.technicianName} placeholder="Technician Name" type="text" manufacturer="technician_name" id="technician_name"
                                        className="form-control" />
                                    <label htmlFor="technician_name">Technician Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input onChange={this.handleEmployeeNumberChange} value={this.state.employeeNumber} placeholder="Employee Number" type="text" name="employee_number" id="employee_number"
                                        className="form-control" />
                                    <label htmlFor="employee_number">Employee Number</label>
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

export default TechnicianForm