import React from "react";

function ServiceList({ services }) {

    async function DeleteService(id) {
        const deleteUrl = `http://localhost:8080/api/service/${id}/`
        const fetchConfig = {
            method: "delete"
        }
        const response = await fetch(deleteUrl, fetchConfig)
        if (response.ok) {
            console.log('Delete Sucessfull', response)
            window.location.reload()
        }
    }
    async function isFinished(id) {
        const finishedUrl = `http://localhost:8080/api/service/${id}/`
        const fetchConfig = {
            method: "put",
            body: JSON.stringify({ "is_finished": true }),
            headers: { "Content-Type": "application/json" }
        }
        const response = await fetch(finishedUrl, fetchConfig)
        if (response.ok) {
            console.log('Completed Sucessfully', response)

            window.location.reload()
        }
    }


    return (
        <table className=' table table-striped '>
            <thead>
                <tr>
                    <th>VIN</th>
                    <th>Customer Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Technician</th>
                    <th>Reason</th>
                </tr>
            </thead>
            <tbody>
                {services && services.map(service => {
                    return (
                        <tr key={service.id}>
                            <td>{service.vin}</td>
                            <td>{service.customer}</td>
                            <td>{service.date}</td >
                            <td>{service.time}</td>
                            <td>{service.technician.name}</td>
                            <td>{service.reason}</td>
                            <td>
                                <button onClick={() => DeleteService(service.id)} type="button" className='btn btn-danger'>Cancel</button>
                            </td>
                            <td>
                                <button onClick={() => isFinished(service.id)} type="button" className='btn btn-success'>Finished</button>
                            </td>
                        </tr >
                    );
                })}
            </tbody >
        </table >
    )

}


export default ServiceList