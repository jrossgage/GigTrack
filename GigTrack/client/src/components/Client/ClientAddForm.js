import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import PhoneInput from 'react-phone-number-input/input'
import { addClient } from '../../modules/clientManager';

const ClientAddForm = () => {
    const emptyclient = {
        companyName: "",
        phoneNumber: 0,
        email: ""
    };

    const [newClient, setNewClient] = useState(emptyclient);
    const [phoneNum, setPhoneNum] = useState();
    const history = useHistory();

    const handleInputChange = (e) => {
        const value = e.target.value;
        const key = e.target.id;


        const clientCopy = { ...newClient };

        clientCopy[key] = value;
        clientCopy.phoneNumber = phoneNum;
        setNewClient(clientCopy);
        console.log("The Client", clientCopy)
    };

    const handleSave = (e) => {
        e.preventDefault();

        if (newClient.name === "" || newClient.phoneNumber === 0 || newClient.email === 0) {
            window.alert(`Please input more information`)

            setNewClient({
                name: "",
                phoneNumber: 0,
                email: 0
            })
            return history.push('/client/add');
        }
        else {
            addClient(newClient).then((c) => {
                history.push(`/client/details/${c.id}`);
            });
        }
    }

    return (
        <Form className="container w-75">
            <h2>Add a New Client</h2>
            <FormGroup>
                <Label for="companyName">Name</Label>
                <Input type="text" name="name" id="companyName" placeholder="Name"
                    // value={newClient.name}
                    onChange={handleInputChange} />
            </FormGroup>
            <PhoneInput country="US" placeholder="Phone Number" value={phoneNum} onChange={setPhoneNum} maxLength='14' />
            {/* <FormGroup>
                <Label for="phoneNumber">Phone Number</Label>
                <Input type="number" name="phoneNumber" id="phoneNumber" placeholder="Phone Number"
                    // value={newClient.phoneNumber}
                    onChange={handleInputChange} />
            </FormGroup> */}
            <FormGroup>
                <Label for="email">Email</Label>
                <Input type="text" name="email" id="email" placeholder="Email"
                    // value={newClient.email}
                    onChange={handleInputChange} />
            </FormGroup>


            <Button className="btn btn-primary" onClick={handleSave}>Save</Button>
            <Button className="btn btn-primary" onClick={() => history.push(`/client`)}>Cancel</Button>

        </Form>
    );
}
export default ClientAddForm;