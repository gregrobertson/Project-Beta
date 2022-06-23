import React, { useState, useEffect } from "react";

function ServiceHistory({ history }) {

    const [search, setSearch] = useState('')

    useEffect(() => { }, [])


    return (
        <>
            <div className="input-group">
                <input type="search" onChange={event => setSearch(event.target.value)} className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                <button type="button" className="btn btn-outline-primary btn-sm">search</button>
            </div>
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
                    {history && history.map(service => {
                        return (
                            <tr key={service.id}>
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
        </>
    )

}


export default ServiceHistory