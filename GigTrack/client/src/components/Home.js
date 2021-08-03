import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from 'reactstrap';

import MainChart from '../components/charts/MainChart'
import { getAllGigs } from "../modules/gigManager";
import { getAllExpense } from "../modules/expenseManager";
import { getCurrentUser } from "../modules/authManager";

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
        <>
            <div className='container'>
                <div>
                    <h2>{`Welcome, ${user.name}`}</h2>
                </div>
                <div>
                    <h4>Total Income for the year:</h4>
                    <p>{`$${totalPay}`}</p>
                </div>
                <div>
                    <h4>Total Expense for the year:</h4>
                    <p>{`$${totalExpense}`}</p>
                </div>
                <Button className="btn btn-primary" onClick={toggle}>{showNet ? 'Hide Net Income' : 'Show Net Income'}</Button>
                {showNet &&
                    <div>
                        <h6>Net Income:</h6>
                        <p>{`$${netIncome}`}</p>
                    </div>
                }
            </div>
            <div className='container'>
                <div>
                    <h4>Mileage Tracker:</h4>
                    <p>{`${totalMileage} miles`}</p>
                </div>

            </div>
            <div>
                <Link to="/gig/add">
                    <button className="btn btn-primary">New Gig</button>
                </Link>
                <Link to="/client/add">
                    <button className="btn btn-primary">New Client</button>
                </Link>
                <Link to="/expense/add">
                    <button className="btn btn-primary">New Expense</button>
                </Link>
            </div>
            <div>
                <div className="container">
                    {gigArr &&
                        <MainChart gigArr={gigArr} expenseArr={expenseArr} />
                    }

                </div>
            </div>


        </>
    );
}