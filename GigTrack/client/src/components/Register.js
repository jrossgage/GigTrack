import React, { useState } from "react";
import { Button, Container, Row, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory } from "react-router-dom";
import { register } from "../modules/authManager";
import "./Register.css"

export default function Register() {
    const history = useHistory();

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const registerClick = (e) => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
            alert("Passwords do not match. Try again.");
        } else {
            const userProfile = { name, email };
            register(userProfile, password)
                .then(() => history.push("/"));
        }
    };

    return (
        <Container>
            <Row>
                <div className="heading">
                    <h1>gig track.</h1>
                </div>
            </Row>
            <div className="register_box">
                <Form onSubmit={registerClick}>
                    <fieldset>
                        <FormGroup>
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" type="text" autoFocus onChange={e => setName(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="confirmPassword">Confirm Password</Label>
                            <Input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Button>Register</Button>
                        </FormGroup>
                    </fieldset>
                </Form>
            </div>
        </Container>
    );
}