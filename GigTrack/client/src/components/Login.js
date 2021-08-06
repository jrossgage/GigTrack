import React, { useState } from "react";
import { Button, Container, Row, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory, Link } from "react-router-dom";
import { login } from "../modules/authManager";
import "./Login.css";

export default function Login() {
    const history = useHistory();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const loginSubmit = (e) => {
        e.preventDefault();
        login(email, password)
            .then(() => history.push("/"))
            .catch(() => alert("Login Failed"));
    }

    return (
        <Container>
            <Row>
                <div className="heading">
                    <h1>gig track.</h1>
                </div>
            </Row>
            <div className="login_box">
                <Form onSubmit={loginSubmit}>
                    <fieldset>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input id="email" type="text" autoFocus onChange={e => setEmail(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Button>Login</Button>
                        </FormGroup>
                        <em>
                            Not registered? <Link to="register">Register</Link>
                        </em>
                    </fieldset>
                </Form>
            </div>
        </Container>
    );
};

