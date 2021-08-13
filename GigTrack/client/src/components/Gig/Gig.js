import React from "react";
import { Card, Button, CardBody, CardTitle, CardSubtitle, CardText } from "reactstrap";
import { Link } from "react-router-dom";
import { dateFixer } from "../../modules/helper";
import "./Gig.css";

const Gig = ({ gig, deleteCurrentGig }) => {

    const cutDate = dateFixer(gig);

    return (
        <div className="list_gig">
            <Card>
                <CardBody>
                    <CardTitle tag="h5"><Link to={`/gig/details/${gig.id}`}>{`${gig.venueName}`}<br></br> {`with ${gig.client.companyName}`}</Link></CardTitle>


                    <CardSubtitle><b>{`${gig.location.city}, ${gig.location.state}`}</b></CardSubtitle>

                    <p><b>{`On ${cutDate}`}</b></p>
                    <CardText><b>Pay:</b></CardText>

                    <div>
                        <button className="btn btn-danger" onClick={() => deleteCurrentGig(gig.id)}>Delete</button>
                        <Link to={`/gig/edit/${gig.id}`}>
                            <button className="btn btn-light  m-1">Edit</button>
                        </Link>
                    </div>
                </CardBody>

            </Card>
        </div>

    )
}
export const ClientGig = ({ gig }) => {

    const cutDate = dateFixer(gig);
    return (
        <div className="list_gig">
            <Card>
                <CardBody>
                    <CardTitle tag="h5"><Link to={`/gig/details/${gig.id}`}>{`${gig.venueName}`}</Link></CardTitle>


                    <CardSubtitle><b>{`${gig.location.city}, ${gig.location.state}`}</b></CardSubtitle>

                    <p><b>{`On ${cutDate}`}</b></p>

                </CardBody>

            </Card>
        </div>
    )
}
export default Gig;