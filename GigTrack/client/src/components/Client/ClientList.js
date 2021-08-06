import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input, Container, Col, Row } from 'reactstrap';
import { getAllClients, deleteClient, searchClients } from '../../modules/clientManager';
import { Link } from "react-router-dom";
import Client from "../Client/Client";
import "./ClientList.css";

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
        <Container>
            <Row>
                <div className="heading">
                    <h1>clients.</h1>
                </div>
            </Row>
            <Row>
                <Col>
                    <div className="form">
                        <div className="info_box" >
                            <input type='text' className="search" required onChange={handleSearch} id="search_box" placeholder="Search By Name" />
                        </div>

                        <Button color="info" size="m" onClick={toggle}>Show{filterClientPay ? ' All' : ' 1099'}</Button>

                        <Link to="/client/add">
                            <Button>New Client</Button>
                        </Link>

                    </div>
                </Col>
                <Col>
                    {clients.map((client) => (
                        <Client client={client} key={client.id} deleteCurrentClient={deleteCurrentClient} />
                    ))}
                </Col>
            </Row>
        </Container>
    )
};
export default ClientList;