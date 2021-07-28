import React, { useEffect, useState } from "react";
import { getAllGigs, deleteGig } from "../../modules/gigManager";
import { Link } from "react-router-dom";
import Gig from "./Gig";

const GigList = () => {

    const [gigs, setGigs] = useState();

    //put some logic in here that looks at the dropdown menus and calls the appropriate fetch
    const getGigs = () => {
        debugger
        getAllGigs().then(g => setGigs(g));
    }

    const deleteCurrentGig = (id) => {
        if (window.confirm("Are you sure?")) {
            deleteGig(id)
                .then(() => getGigs());
        }
    }

    useEffect(() => {
        getGigs();
    }, []);

    return (
        <>
            <div className="container">

                <Link to="/gig/add">
                    <button className="btn btn-primary">New Gig</button>
                </Link>

            </div>
            <div className="container">
                <div>
                    {gigs?.map((gig) => (
                        <Gig gig={gig} key={gig.id} deleteCurrentGig={deleteCurrentGig} />
                    ))}
                </div>
            </div>
        </>
    )
};
export default GigList;