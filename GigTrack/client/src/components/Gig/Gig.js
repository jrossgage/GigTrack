import React from "react";
import { Card, Cardbody, Button } from "reactstrap";
import { Link } from "react-router-dom";

const Gig = ({ gig, deleteCurrentGig }) => {

    return (
        <Card >
            <div>

                <p><b><Link to={`/gig/details/${gig.id}`}>{`${gig.venueName} with ${gig.client.companyName}`}</Link></b></p>


                <p><b>{`${gig.location.city}, ${gig.location.state}`}</b></p>

                <p><b>{gig.date}</b></p>

                <div>
                    <button className="btn btn-danger" onClick={() => deleteCurrentGig(gig.id)}>Delete</button>
                    <Link to={`/gig/edit/${gig.id}`}>
                        <button className="btn btn-light  m-2">Edit</button>
                    </Link>
                </div>

            </div>
        </Card>
    )
}
export default Gig;