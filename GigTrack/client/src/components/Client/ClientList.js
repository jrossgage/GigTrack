import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { getAllClients, deleteClient, searchClients } from '../../modules/clientManager';
import { Link } from "react-router-dom";
import Client from "../Client/Client";


const ClientList = () => {

    const [clients, setClients] = useState([]);
    const [search, setSearch] = useState("");
    const [filterClientPay, setFilterClientPay] = useState(false);

    const toggle = () => {
        setFilterClientPay(!filterClientPay);
    }

    const filterClientsByPay = (clientArr) => {
        let filteredClients = [];

        for (const c of clientArr) {
            if (c.paySum >= 600) {
                filteredClients.push(c)
            }
        }
        setClients(filteredClients);
    }

    //the conditional line checking for the 1099 button and the search bar. GOAL: to be able to search by name while
    //the 1099 button is true.
    const getClients = () => {
        if (filterClientPay === false && search === '') {
            getAllClients().then(c => {
                setClients(c);
            })
        }
        else if (filterClientPay && search == '') {
            // filterClientsByPay(clients);
            getAllClients().then(c => {
                filterClientsByPay(c);
            })

        }
        else if (filterClientPay && search != '') {
            searchClients(search).then((c) => {
                setClients(c)
                if (c.length > 0) {
                    filterClientsByPay(c);
                }
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
    }, [search, filterClientPay]);



    return (
        <>
            <div className="container">
                <div >
                    <input type='text' className="search" required onChange={handleSearch} id="search_box" placeholder="Search By Name" />
                </div>

                <Button className="btn btn-primary" onClick={toggle}>Show{filterClientPay ? ' All' : ' Only 1099'}</Button>

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