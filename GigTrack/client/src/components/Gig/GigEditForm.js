import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { getAllLocations } from '../../modules/locationManager';
import { getAllClients } from '../../modules/clientManager';
import { getGigById, updateGig } from '../../modules/gigManager';
import { momentDateFixer } from '../../modules/helper';

const GigEditForm = () => {
    const [editGig, setEditGig] = useState({});
    const [locations, setLocations] = useState([]);
    const [clients, setClients] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { id } = useParams();
    const history = useHistory();

    const handleInputChange = (e) => {
        const value = e.target.value;
        const key = e.target.id;

        const gigCopy = { ...editGig };

        gigCopy[key] = value;
        setEditGig(gigCopy);
    };

    const getEditGigById = () => {
        return getGigById(id).then(gig => {
            let editedGig = gig
            editedGig.date = momentDateFixer(gig)
            setEditGig(editedGig);
            setIsLoading(false)
        })
    }
    // const fetchProperty = () => {
    //     return getPropertyById(id).then(property => {
    //         let editedProperty = property
    //         editedProperty.lastService = momentDateFixer(property)
    //         setProperty(editedProperty)
    //     });
    // }

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

    const handleUpdate = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const editedGig = {
            id: id,
            pay: editGig.pay,
            date: editGig.date,
            mileage: editGig.mileage,
            clientId: editGig.clientId,
            venueName: editGig.venueName,
            locationId: editGig.locationId,
            notes: editGig.notes,
        };
        updateGig(editedGig)
            .then((g) => {
                history.push(`/gig/details/${editedGig.id}`);
            });
    };

    const handleDate = (event) => {
        event.preventDefault();
        let editedGig = { ...editGig };
        console.log(event.target.value)
        let editDate = event.target.value
        editedGig[event.target.id] = editDate
        setEditGig(editedGig)
    }

    useEffect(() => {
        getClients();
        getLocations();
        getEditGigById();
    }, [id])

    return (
        <Form className="container w-75">
            <h2>Edit Gig</h2>
            <FormGroup>
                <Label for="Venue">Venue</Label>
                <Input type="text" name="venueName" id="venueName" placeholder="Venue"
                    value={editGig.venueName}
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
                <Label for="pay">Pay</Label>
                <Input type="number" name="pay" id="pay" placeholder="pay"
                    value={editGig.pay}
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
                <Label for="mileage">Mileage</Label>
                <Input type="number" name="mileage" id="mileage" placeholder="mileage"
                    value={editGig.mileage}
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
                <Label for="date">Date</Label>
                <Input type="date" name="date" id="date" placeholder="date" defaultValue={momentDateFixer(editGig)} format="YYYY-MM-DD"
                    value={editGig.date}
                    onChange={handleDate} />
            </FormGroup>
            <FormGroup>
                <Label for="Client">Client </Label>
                <select value={editGig.clientId} name="clientId" id="clientId" onChange={handleInputChange} className='form-control'>
                    <option value="0">Select Client</option>
                    {clients.map(c => (
                        <option key={c.id} value={c.id}>{c.companyName}</option>
                    ))}
                </select>
            </FormGroup>
            <FormGroup>
                <Label for="Location">Location</Label>
                <select value={editGig.locationId} name="locationId" id="locationId" onChange={handleInputChange} className='form-control'>
                    <option value="0">Select Location</option>
                    {locations.map(l => (
                        <option key={l.id} value={l.id}>{`${l.city}, ${l.state}`}</option>
                    ))}
                </select>
            </FormGroup>

            <FormGroup>
                <Label for="notes">Notes</Label>

                <textarea type="text" name="notes" id="notes" placeholder="notes"
                    value={editGig.notes}
                    onChange={handleInputChange} rows="10" cols="145" />

            </FormGroup>

            <Button className="btn btn-primary" onClick={handleUpdate}>Save</Button>
            <Button className="btn btn-primary" onClick={() => history.push(`/gig`)}>Cancel</Button>

        </Form>
    )
}
export default GigEditForm;