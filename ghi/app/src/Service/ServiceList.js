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

    //------Making my table data a bit more dynamic-------------------------------->
    const isVip = a => (a) ? "✅" : "❌"

    //--------Centering my table data----------------------------------------------->
    const CenteredTd = ({ children }) => <td className="align-middle">{children}</td>;

    //------------Cleaning up the Buttons------------------------------------------->
    const Button = ({ fn, cls, children }) => <td>
        <button onClick={fn} className={cls}>{children}</button>
    </td>
    //------------------------------------------------------------------------------>


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
                            <CenteredTd>{service.vin}             </CenteredTd>
                            <CenteredTd>{service.customer}        </CenteredTd>
                            <CenteredTd>{service.date}            </CenteredTd>
                            <CenteredTd>{service.time}            </CenteredTd>
                            <CenteredTd>{service.technician.name} </CenteredTd>
                            <CenteredTd>{service.reason}          </CenteredTd>
                            <CenteredTd>{isVip(service.is_vip)}   </CenteredTd>
                            <Button fn={() => DeleteService(service.id)} cls='btn btn-danger'>Cancel</Button>
                            <Button fn={() => isFinished(service.id)} cls='btn btn-success'>Finished</Button>
                            {/* {centeredTd{centeredTd(service.vin)}
                            {centeredTd(service.customer)}
                            {centeredTd(service.date)}
                            {centeredTd(service.time)}
                            {centeredTd(service.technician.name)}
                            {centeredTd(service.reason)}
                            {centeredTd(isVip(service.is_vip))} */}
                            {/* {Button(() => DeleteService(service.id), 'btn btn-danger', 'Cancel')}
                            {Button(() => isFinished(service.id), 'btn btn-success', 'Finished')} */}
                        </tr >
                    );
                })}
            </tbody >
        </table >
    )
}


export default ServiceList