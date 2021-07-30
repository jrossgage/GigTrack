import React from "react";
import { Card, CardBody, ListGroupItem, ListGroup, Button } from "reactstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getGigById } from "../../modules/gigManager";

const GigDetails = () => {
    const [gig, setGig] = useState({});
    const { id } = useParams();

    const getGigDetails = () => {
        getGigById(id)
            .then(setGig)
    }

    useEffect(() => {
        getGigDetails();
    }, []);

    return (
        <>
            <h2 className="text-center">Details </h2>
            <Card className="w-75 mx-auto">
                <CardBody>
                    <h4>Gig Details</h4>
                    <Link to={`/client/details/${gig.clientId}`}><p><b>{gig?.client?.companyName}</b></p></Link>
                    <p>At {gig.venueName}</p>
                    <p>{`${gig?.location?.city}, ${gig?.location?.state}`}</p>
                    <p>{gig.mileage} miles</p>
                    <p>{gig.date}</p>
                    <p>{gig.notes}</p>
                    <p>Pay: {gig.pay}</p>

                    <Link to={`/gig`}>
                        <Button className="btn btn-primary">Back to Gigs</Button>
                    </Link>
                </CardBody>
            </Card >
        </>
    )
}
export default GigDetails;