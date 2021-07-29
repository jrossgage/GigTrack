import React from "react";
import { Card, CardBody, ListGroupItem, ListGroup, Button } from "reactstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getClientById } from "../../modules/clientManager";

const ClientDetails = () => {
    const [client, setClient] = useState({});
    const { id } = useParams();

    const getClientDetails = () => {
        getClientById(id)
            .then(setClient)
    }

    useEffect(() => {
        getClientDetails();
    }, []);

    return (
        <>
            <h2 className="text-center">Details </h2>
            <Card className="w-75 mx-auto">
                <CardBody>
                    <h4>{client.companyName}</h4>
                    <div>
                        <p>{client.phoneNumber}</p>
                        <p>{client.email}</p>
                    </div>

                    {/* <Link to={`/client`}>
                        <Button className="btn btn-primary">See All Gigs from Client</Button>
                    </Link> */}

                    <Link to={`/client`}>
                        <Button className="btn btn-primary">To Clients</Button>
                    </Link>
                </CardBody>
            </Card >
        </>
    )
}
export default ClientDetails;