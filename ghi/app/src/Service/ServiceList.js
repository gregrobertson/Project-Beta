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

    //-----------------READABLE????------------------------------->
    const isVip = a => (a) ? "✅" : "❌"

    const centeredTd = str => <td className="align-middle">{str}</td>;

    const button = (fn, cls, txt) => <td>
        <button onClick={fn} className={cls}>{txt}</button>
    </td>
    //------------------------------------------------->


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
                    <th>VIP</th>
                </tr>
            </thead>
            <tbody>
                {services?.map(service => {
                    return (
                        <tr key={service.id}>
                            {centeredTd(service.vin)}
                            {centeredTd(service.customer)}
                            {centeredTd(service.date)}
                            {centeredTd(service.time)}
                            {centeredTd(service.technician.name)}
                            {centeredTd(service.reason)}
                            {centeredTd(isVip(service.is_vip))}
                            {button(() => DeleteService(service.id), 'btn btn-danger', 'Cancel')}
                            {button(() => isFinished(service.id), 'btn btn-success', 'Finished')}
                        </tr >
                    );
                })}
            </tbody >
        </table >
    )
}


export default ServiceList