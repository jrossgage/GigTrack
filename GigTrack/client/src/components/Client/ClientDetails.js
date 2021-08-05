import React from "react";
import { Card, CardBody, ListGroupItem, ListGroup, Button, Container, Row } from "reactstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getClientById } from "../../modules/clientManager";
import { filterGigsByClientId } from "../../modules/gigManager";
import Gig, { ClientGig } from "../Gig/Gig";
import { formatPhoneNumber } from 'react-phone-number-input';

const ClientDetails = () => {
    const [client, setClient] = useState({});
    const [gigs, setGigs] = useState([]);
    const [showClientGigs, setShowClientGigs] = useState(false);
    const { id } = useParams();

    const cutPhoneNumber = formatPhoneNumber(client.phoneNumber);

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
        if (gigs.length < 1) {
            return (
                <div>
                    <h6>You have no gigs with this client</h6>
                </div>
            )
        } else {

            return (
                <div>
                    {gigs?.map((gig) => (
                        <ClientGig gig={gig} key={gig.id} />
                    ))}
                </div>
            )
        }
    };

    useEffect(() => {
        getClientDetails();
        getGigs();
    }, []);

    return (
        <Container>
            <Row>
                <div className="heading">
                    <h1>client details.</h1>
                </div>
            </Row>

            <div className="box_details">
                <Card>
                    <CardBody>
                        <h4>{client.companyName}</h4>
                        <div>
                            <p><b><a href={`tel:${cutPhoneNumber}`}>{cutPhoneNumber}</a></b></p>
                            <p><b><a href={`mailto:${client.email}`}>{client.email}</a></b></p>
                        </div>
                        <Link to={`/client`}>
                            <Button className="btn btn-primary">To Clients</Button>
                        </Link>


                        <Button color="info" onClick={toggle}>{showClientGigs ? 'Hide' : 'See'} All Gigs from Client</Button>

                        {showClientGigs && gigClientDisplay()}


                    </CardBody>
                </Card >
            </div>
        </Container>
    )
}
export default ClientDetails;