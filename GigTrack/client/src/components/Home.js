import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Col, Row, Label, Jumbotron, Card } from 'reactstrap';

import MainChart from '../components/charts/MainChart'
import { getAllGigs } from "../modules/gigManager";
import { getAllExpense } from "../modules/expenseManager";
import { getCurrentUser } from "../modules/authManager";
import "./Home.css"

export default function Home() {

    const [gigArr, setGigArr] = useState([]);
    const [expenseArr, setExpenseArr] = useState([]);

    const [totalPay, setTotalPay] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [totalMileage, setTotalMileage] = useState(0);
    const [netIncome, setNetIncome] = useState(0);
    const [user, setUser] = useState({})
    const [showNet, setShowNet] = useState(false);

    const toggle = () => {
        getNet();
        setShowNet(!showNet);
    }

    const getGigPay = () => {
        getAllGigs().then(gigs => {
            getTotals(gigs);
            setGigArr(gigs);
        })
    };

    const getUser = () => {
        getCurrentUser().then(u => setUser(u));
    }

    const getExpensesPaid = () => {
        getAllExpense().then(expenses => {
            setExpenseArr(expenses);
            getTotalExpense(expenses);
        })
    };

    const getTotals = (gigs) => {
        let totalP = 0;
        let totalM = 0;
        for (let g of gigs) {
            totalP += g.pay
            totalM += g.mileage
        }
        setTotalPay(totalP);
        setTotalMileage(totalM);
    };

    const getNet = () => {
        let net = totalPay - totalExpense;
        setNetIncome(net);
    }

    const getTotalExpense = (expenses) => {
        let total = 0;
        for (let e of expenses) {
            total += e.cost
        }
        setTotalExpense(total);
    };



    useEffect(() => {
        getUser();
        getGigPay();
        getExpensesPaid();
    }, []);

    return (
        <Container>


            <Col className="Column m-auto">
                <div className="title">
                    <h3>{`Welcome, ${user.name}`}</h3>
                </div>
            </Col>


            <Row>
                <Col>
                    <div className="box">
                        <h4>Total Income for the year:</h4>
                        <p style={{ color: "Green", fontSize: 25 }}><b>{`$${totalPay}`}</b></p>
                    </div>
                    <div className="box">
                        <h4>Total Expense for the year:</h4>
                        <p style={{ color: "Red", fontSize: 25 }}><b>{`$${totalExpense}`}</b></p>
                    </div>

                    <div className="box">
                        <h4>Mileage Tracker:</h4>
                        <p style={{ fontSize: 25 }}><b>{`${totalMileage} mi.`}</b></p>
                    </div>

                </Col>


                <Col>

                    <div className="box" id="graph">
                        {gigArr &&
                            <MainChart gigArr={gigArr} expenseArr={expenseArr} />
                        }

                    </div>


                    <div>
                        <Link to="/gig/add">
                            <Button className="m-1">New Gig</Button>
                        </Link>
                        <Link to="/client/add">
                            <Button className="m-1">New Client</Button>
                        </Link>
                        <Link to="/expense/add">
                            <Button className="m-1">New Expense</Button>
                        </Link>
                    </div>
                    <div className="">
                        <Button size="sm" color="info" onClick={toggle}>{showNet ? 'Hide Net Income' : 'Show Net Income'}</Button>
                        {showNet &&
                            <div className="box" id="net">
                                <h6>Net Income:</h6>
                                <p><b>{`$${netIncome}`}</b></p>
                            </div>
                        }
                    </div>

                </Col>

            </Row>


        </Container >
    );
}