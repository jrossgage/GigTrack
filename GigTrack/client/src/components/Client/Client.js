import React from "react";
import { Card, Cardbody, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { formatPhoneNumber } from 'react-phone-number-input'

const Client = ({ client, deleteCurrentClient }) => {

    const cutPhoneNumber = formatPhoneNumber(client.phoneNumber);

    return (
        <Card >
            <div>

                <p><b><Link to={`/client/details/${client.id}`}>{client.companyName}</Link></b></p>


                <p><b><a href={`tel:${cutPhoneNumber}`}>{cutPhoneNumber}</a></b></p>

                <p><b><a href={`mailto:${client.email}`}>{client.email}</a></b></p>

                <div>
                    <button className="btn btn-danger" onClick={() => deleteCurrentClient(client.id)}>Delete</button>
                    <Link to={`/client/edit/${client.id}`}>
                        <button className="btn btn-light  m-2">Edit</button>
                    </Link>
                </div>

            </div>
        </Card>
    )
}
export default Client;