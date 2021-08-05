import React from "react";
import { Card, CardBody, Button, CardSubtitle, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";
import { formatPhoneNumber } from 'react-phone-number-input'
import "./Client.css";
const Client = ({ client, deleteCurrentClient }) => {

    const cutPhoneNumber = formatPhoneNumber(client.phoneNumber);

    return (
        <div className="list_client">
            <Card>
                <CardBody>

                    <Link to={`/client/details/${client.id}`}>
                        <CardTitle tag="h5" >
                            {client.companyName}
                        </CardTitle>
                    </Link>

                    <CardSubtitle><b><a href={`tel:${cutPhoneNumber}`}>{cutPhoneNumber}</a></b></CardSubtitle>

                    <p><b><a href={`mailto:${client.email}`}>{client.email}</a></b></p>

                    <div>
                        <button className="btn btn-danger" onClick={() => deleteCurrentClient(client.id)}>Delete</button>
                        <Link to={`/client/edit/${client.id}`}>
                            <button className="btn btn-light  m-2">Edit</button>
                        </Link>
                    </div>

                </CardBody>
            </Card>
        </div>
    )
}
export default Client;