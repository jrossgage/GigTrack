import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { getClientById, updateClient } from '../../modules/clientManager';

const ClientEditForm = () => {
    const [editClient, setEditClient] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const { id } = useParams();
    const history = useHistory();

    const handleInputChange = (e) => {
        const value = e.target.value;
        const key = e.target.id;

        const clientCopy = { ...editClient };

        clientCopy[key] = value;
        setEditClient(clientCopy);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const editedClient = {
            id: id,
            companyName: editClient.name,
            phoneNumber: editClient.phoneNumber,
            email: editClient.email,
        };
        updateClient(editedClient)
            .then((c) => {
                history.push(`/client/details/${editedClient.id}`);
            });
    };

    useEffect(() => {
        getClientById(id)
            .then(c => {
                setEditClient(c);
                setIsLoading(false)
            });
    }, [id])

    return (
        <Form className="container w-75">
            <h2>Edit Client</h2>
            <FormGroup>
                <Label for="companyName">Name</Label>
                <Input type="text" name="companyName" id="companyName" placeholder="Name"
                    value={editClient.companyName}
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
                <Label for="phoneNumber">Phone Number</Label>
                <Input type="number" name="phoneNumber" id="phoneNumber" placeholder="Phone"
                    value={editClient.phoneNumber}
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
                <Label for="email">Email</Label>
                <Input type="text" name="email" id="email" placeholder="Email"
                    value={editClient.email}
                    onChange={handleInputChange} />
            </FormGroup>


            <Button className="btn btn-primary" onClick={handleUpdate}>Save</Button>
            <Button className="btn btn-primary" onClick={() => history.push(`/client`)}>Cancel</Button>

        </Form>
    )
}
export default ClientEditForm;