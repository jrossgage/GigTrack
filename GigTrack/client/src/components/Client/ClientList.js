import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { getAllClients, deleteClient } from '../../modules/clientManager';
import { Link } from "react-router-dom";
import Client from "../Client/Client";

const ClientList = () => {

    const [clients, setClients] = useState([]);

    const getClients = () => {
        getAllClients().then(c => {
            setClients(c);
        })
    };

    const deleteCurrentClient = (id) => {
        if (window.confirm("Are you sure?")) {
            deleteClient(id)
                .then(() => getClients());
        }
    };

    useEffect(() => {
        getClients();
    }, []);



    return (
        <>
            <div className="container">

                <Link to="/client/add">
                    <button className="btn btn-primary">New Client</button>
                </Link>

            </div>
            <div>
                <div className="container">
                    <div>
                        {clients.map((client) => (
                            <Client client={client} key={client.id} deleteCurrentClient={deleteCurrentClient} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
};
export default ClientList;