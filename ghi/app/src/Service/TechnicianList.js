import React from "react";

function TechnicianList({ technicians }) {

    async function DeleteService(id) {
        const deleteUrl = `http://localhost:8080/api/technician/${id}/`
        const fetchConfig = {
            method: "delete"
        }
        const response = await fetch(deleteUrl, fetchConfig)
        if (response.ok) {
            console.log('Delete Sucessfull', response)
        }
    }
    async function isFinished(id) {
        const finishedUrl = `http://localhost:8080/api/technician/${id}/`
        const fetchConfig = {
            method: "put"
        }
        const response = await fetch(finishedUrl, fetchConfig)
        if (response.ok) {
            console.log('Completed Sucessfully', response)
        }
    }


    return (
        <table className=' table table-striped '>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Employee Number</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Technician</th>
                    <th>Reason</th>
                </tr>
            </thead>
            <tbody>
                {technicians && technicians.map(service => {
                    return (
                        <tr key={service.vin}>
                            <td>{service.vin}</td>
                            <td>{service.customer}</td>
                            <td>{service.date}</td >
                            <td>{service.time}</td>
                            <td>{service.technician.name}</td>
                            <td>{service.reason}</td>
                        </tr >
                    );
                })}
            </tbody >
        </table >
    )

}


export default TechnicianList