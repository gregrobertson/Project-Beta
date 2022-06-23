import React from "react";

function TechnicianList({ technicians }) {



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