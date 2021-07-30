import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { getAllClients, deleteClient, searchClients } from '../../modules/clientManager';
import { Link } from "react-router-dom";
import Client from "../Client/Client";


const ClientList = () => {

    const [clients, setClients] = useState([]);
    const [search, setSearch] = useState("");

    const getClients = () => {
        if (search == '') {
            getAllClients().then(c => {
                setClients(c);
            })
        }
        else {
            searchClients(search).then(clients => setClients(clients));
        }
    };

    const handleSearch = (evt) => {
        evt.preventDefault()
        let searchInput = evt.target.value
        setSearch(searchInput)
    };

    const deleteCurrentClient = (id) => {
        if (window.confirm("Are you sure?")) {
            deleteClient(id)
                .then(() => getClients());
        }
    };

    useEffect(() => {
        getClients();
    }, [search]);



    return (
        <>
            <div className="container">
                <div >
                    <input type='text' className="search" required onChange={handleSearch} id="search_box" placeholder="Search By Name" />
                </div>

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