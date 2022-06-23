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


    return (
        <table className=' table table-striped '>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Employee Number</th>
                </tr>
            </thead>
            <tbody>
                {technicians && technicians.map(technician => {
                    return (
                        <tr key={technician.id}>
                            <td>{technician.name}</td>
                            <td>{technician.employee_number}</td>

                        </tr >
                    );
                })}
            </tbody >
        </table >
    )

}


export default TechnicianList