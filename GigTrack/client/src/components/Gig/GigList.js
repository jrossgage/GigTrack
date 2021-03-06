import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input, Container, Col, Row } from 'reactstrap';
import { getAllGigs, deleteGig, filterGigsByClientId, filterGigsByLocationId, filterGigsByVenueName } from "../../modules/gigManager";
import { Link, useHistory } from "react-router-dom";
import Gig from "./Gig";
import { getAllLocations } from "../../modules/locationManager";
import { getAllClients } from "../../modules/clientManager";
import "./GigList.css"

const GigList = () => {

    const [gigs, setGigs] = useState([]);
    const [locations, setLocations] = useState([]);
    const [clients, setClients] = useState([]);
    const [venues, setVenues] = useState([]);
    const [totalPay, setTotalPay] = useState(0);

    const [dropDownSelection, setDropDownSelection] = useState(0);
    const history = useHistory();

    const getGigs = () => {
        getAllGigs().then(g => {
            setGigs(g);
            getTotalPay(g);
        })
    };

    const deleteCurrentGig = (id) => {
        if (window.confirm("Are you sure?")) {
            deleteGig(id)
                .then(() => getGigs());
        }
    };

    //fetch calls to generate location and client dropdowns
    const getLocations = () => {
        return getAllLocations()
            .then(locationFromAPI => {
                setLocations(locationFromAPI)
            })
    };

    const getClients = () => {
        return getAllClients()
            .then(clientsFromAPI => {
                setClients(clientsFromAPI)
            })
    };

    const getVenueNames = () => {
        const venueNamesArray = [];
        gigs.map(gig =>
            venueNamesArray.push(gig.venueName))
        setVenues(venueNamesArray);
    };

    const getTotalPay = (gigs) => {
        let total = 0;
        for (let g of gigs) {
            total += g.pay
        }
        setTotalPay(total);
    }
    //-------------------

    //Drop down Handlers-----
    const handleMainDropMenu = (e) => {
        const id = e.target.value;
        console.log("Main drop down Id", id)

        setDropDownSelection(id);
        if (id === "0") {
            getGigs();
        }
    };

    //Small drop down not working as expected. The page needs to refresh when the O value is selected.
    const handleDropDownChange = (e) => {
        const menuName = e.target.name;
        const id = e.target.value;

        if (id === "0") {
            getGigs();
        }
        else if (menuName === 'clients') {
            filterGigsByClientId(id)
                .then(g => {
                    setGigs(g);
                })
        }
        else if (menuName === 'locations') {
            filterGigsByLocationId(id)
                .then(g => {
                    setGigs(g);
                })
        }
        else if (menuName === 'venues') {
            filterGigsByVenueName(id)
                .then(g => {
                    setGigs(g);
                })
        }
    };

    //--------------------
    useEffect(() => {
        getGigs();
    }, []);

    useEffect(() => {
        getLocations();
        getClients();
        getVenueNames();
    }, [dropDownSelection]);

    return (
        <Container>
            <Row>
                <div className="heading">
                    <h1>gigs.</h1>
                </div>
            </Row>


            <Row>
                <Col>
                    <div className="form">
                        <Form>
                            <FormGroup style={{ padding: 15 }}>
                                <select onChange={handleMainDropMenu}>
                                    <option value="0">Filter by:</option>
                                    <option value="1">Venue</option>
                                    <option value="2">Clients</option>
                                    <option value="3">Locations</option>
                                </select>
                            </FormGroup>
                            {dropDownSelection === '1' &&
                                <FormGroup>
                                    <Label for="Venue">Venue</Label>
                                    <select name="venues" id="venues" onChange={handleDropDownChange} className='form-control'>
                                        <option value="0">Venue</option>
                                        {venues.map(v => (
                                            <option key={v} value={v}>{v}</option>
                                        ))}
                                    </select>
                                </FormGroup>
                            }
                            {dropDownSelection === '2' &&
                                <FormGroup>
                                    <select name="clients" id="clients" onChange={handleDropDownChange} className='form-control'>
                                        <option value="0">Client</option>
                                        {clients.map(c => (
                                            <option key={c.id} value={c.id}>{c.companyName}</option>
                                        ))}
                                    </select>
                                </FormGroup>}
                            {dropDownSelection === '3' &&
                                <FormGroup>
                                    <select name="locations" id="locations" onChange={handleDropDownChange} className='form-control'>
                                        <option value="0">Location</option>
                                        {locations.map(l => (
                                            <option key={l.id} value={l.id}>{`${l.city}, ${l.state}`}</option>
                                        ))}
                                    </select>
                                </FormGroup>}
                        </Form>

                        <div className="container">
                            <Link to="/gig/add">
                                <Button className="btn btn-primary">New Gig</Button>
                            </Link>
                        </div>

                    </div>
                    <div className="info_box">
                        <div className="info_display">
                            <h4>Total Income for the year:</h4>
                            <p style={{ color: "Green", fontSize: 25 }}><b>{`$${totalPay}`}</b></p>
                        </div>
                    </div>
                </Col>

                <Col>
                    {gigs?.map((gig) => (
                        <Gig gig={gig} key={gig.id} deleteCurrentGig={deleteCurrentGig} />
                    ))}
                </Col>




            </Row>
        </Container >
    )
};
export default GigList;