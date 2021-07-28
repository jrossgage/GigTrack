import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { addGig } from '../../modules/gigManager';
import { getAllLocations } from '../../modules/locationManager';
import { getAllClients } from '../../modules/clientManager';

const GigAddForm = () => {
    const emptyGig = {
        pay: 0,
        date: 0,
        mileage: 0,
        clientId: 0,
        venueName: '',
        locationId: 0,
        notes: '',
    };

    const [newGig, setNewGig] = useState(emptyGig);
    const [locations, setLocations] = useState([]);
    const [clients, setClients] = useState([]);
    const history = useHistory();


    const handleInputChange = (e) => {
        const value = e.target.value;
        const key = e.target.id;

        const gigCopy = { ...newGig };

        gigCopy[key] = value;
        setNewGig(gigCopy);
    };

    const handleSave = (e) => {
        e.preventDefault();

        if (newGig.pay === 0 || newGig.date === 0 || newGig.mileage === 0 || newGig.clientId === 0 || newGig.venueName === '' || newGig.locationId === 0) {
            window.alert(`Please input more information`)

            setNewGig({
                pay: 0,
                date: 0,
                mileage: 0,
                clientId: 0,
                venueName: '',
                locationId: 0,
                notes: '',
            })
            return history.push('/gig/add');
        }
        else {
            addGig(newGig).then((g) => {
                history.push(`/gig/details/${g.id}`);
            });
        }
    }

    //Make handler functions for the location and client fetch calls
    const getLocations = () => {
        return getAllLocations()
            .then(locationFromAPI => {
                setLocations(locationFromAPI)
            })
    }

    const getClients = () => {
        return getAllClients()
            .then(clientsFromAPI => {
                setClients(clientsFromAPI)
            })
    }



    useEffect(() => {
        getClients();
        getLocations();
    }, [])

    return (
        <Form className="container w-75">
            <h2>Add a New Gig</h2>
            <FormGroup>
                <Label for="Venue">Venue</Label>
                <Input type="text" name="venueName" id="venueName" placeholder="Venue"
                    value={newGig.venueName}
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
                <Label for="pay">Pay</Label>
                <Input type="number" name="pay" id="pay" placeholder="pay"
                    value={newGig.pay}
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
                <Label for="mileage">Mileage</Label>
                <Input type="number" name="mileage" id="mileage" placeholder="mileage"
                    value={newGig.mileage}
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
                <Label for="date">Date</Label>
                <Input type="date" name="date" id="date" placeholder="date"
                    value={newGig.date}
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
                <Label for="Client">Client </Label>
                <select value={newGig.clientId} name="clientId" id="clientId" onChange={handleInputChange} className='form-control'>
                    <option value="0">Client</option>
                    {clients.map(c => (
                        <option key={c.id} value={c.id}>{c.companyName}</option>
                    ))}
                </select>
            </FormGroup>
            <FormGroup>
                <Label for="Location">Location</Label>
                <select value={newGig.locationId} name="locationId" id="locationId" onChange={handleInputChange} className='form-control'>
                    <option value="0">Location</option>
                    {locations.map(l => (
                        <option key={l.id} value={l.id}>{`${l.city}, ${l.state}`}</option>
                    ))}
                </select>
            </FormGroup>
            {/* <Button className="btn btn-primary" onClick={}>Add New Location</Button> */}

            <FormGroup>
                <Label for="notes">Notes</Label>

                <textarea type="text" name="notes" id="notes" placeholder="notes"
                    value={newGig.notes}
                    onChange={handleInputChange} rows="10" cols="145" />

            </FormGroup>

            <Button className="btn btn-primary" onClick={handleSave}>Save</Button>
            <Button className="btn btn-primary" onClick={() => history.push(`/gig`)}>Cancel</Button>

        </Form>
    );
}
export default GigAddForm;