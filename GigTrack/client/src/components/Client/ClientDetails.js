import React from "react";
import { Card, CardBody, ListGroupItem, ListGroup, Button } from "reactstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getClientById } from "../../modules/clientManager";
import { filterGigsByClientId } from "../../modules/gigManager";
import Gig, { ClientGig } from "../Gig/Gig"

const ClientDetails = () => {
    const [client, setClient] = useState({});
    const [gigs, setGigs] = useState([]);
    const [showClientGigs, setShowClientGigs] = useState(false);
    const { id } = useParams();

    const toggle = () => setShowClientGigs(!showClientGigs);

    const getClientDetails = () => {
        getClientById(id)
            .then(setClient)
    }

    const getGigs = () => {
        filterGigsByClientId(id).then(g => {
            setGigs(g);
        })
    };

    const gigClientDisplay = () => {
        if (!gigs) {
            return (
                <div className="container">
                    <h4>You have no gigs with this client</h4>
                </div>
            )
        } else {
            debugger
            return (
                <div className="container">
                    <div>
                        {gigs?.map((gig) => (
                            <ClientGig gig={gig} key={gig.id} />
                        ))}
                    </div>
                </div>
            )
        }
    };

    useEffect(() => {
        getClientDetails();
        getGigs();
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
                    <Link to={`/client`}>
                        <Button className="btn btn-primary">To Clients</Button>
                    </Link>


                    <Button className="btn btn-primary" onClick={toggle}>{showClientGigs ? 'Hide' : 'See'} All Gigs from Client</Button>

                    {showClientGigs && gigClientDisplay()}


                </CardBody>
            </Card >
        </>
    )
}
export default ClientDetails;