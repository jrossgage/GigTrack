import React from "react";
import { Card, CardBody, ListGroupItem, ListGroup, Button, Container, Row, CardSubtitle } from "reactstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getGigById } from "../../modules/gigManager";
import { dateFixer } from "../../modules/helper";
import "./GigDetails.css";

const GigDetails = () => {

    const [gig, setGig] = useState({});
    const { id } = useParams();

    const cutDate = dateFixer(gig);

    const getGigDetails = () => {
        getGigById(id)
            .then(setGig)
    }

    useEffect(() => {
        getGigDetails();
    }, []);

    return (
        <Container>
            <Row>
                <div className="heading">
                    <h1>gigs details.</h1>
                </div>
            </Row>


            <div className="box_details">
                <Card>
                    <CardBody>
                        <Link to={`/client/details/${gig.clientId}`}><h3>{gig?.client?.companyName}</h3></Link>
                        <h4>At {gig.venueName}</h4>
                        <CardSubtitle>{`${gig?.location?.city}, ${gig?.location?.state}`}</CardSubtitle>
                        <p>{cutDate}</p>
                        <p><b>Notes:</b></p>
                        <div className="box_inner_notes">
                            <p> {gig.notes}</p>
                        </div>
                        <div className="container_miles">
                            <div className="box_inner">
                                <p style={{ color: "white" }}><b>{gig.mileage} miles</b></p>
                                <p style={{ color: "white" }}><b>Pay: </b></p><p style={{ color: "Green", fontSize: 20 }}><b>{`$${gig.pay}`}</b></p>
                            </div>
                        </div>

                        <Link to={`/gig`}>
                            <Button className="btn btn-primary">Back to Gigs</Button>
                        </Link>
                    </CardBody>
                </Card >
            </div >
        </Container >
    )
}
export default GigDetails;