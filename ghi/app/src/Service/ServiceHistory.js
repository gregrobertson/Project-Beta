import React from "react";

function ServiceHistory({ services }) {


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


export default ServiceHistory