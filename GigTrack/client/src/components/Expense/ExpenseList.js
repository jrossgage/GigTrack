import React, { useEffect, useState } from "react";
import { Button, Row, Col, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import { getAllExpense, deleteExpense, searchExpenses } from '../../modules/expenseManager';
import { Link, useHistory } from "react-router-dom";
import Expense from "../Expense/Expense"
import "./ExpenseList.css"

const ExpenseList = () => {

    const [expenses, setExpenses] = useState([]);
    const [totalExpense, setTotalExpense] = useState(0);
    const [search, setSearch] = useState("");

    const getExpenses = () => {
        if (search == '') {
            getAllExpense().then(e => {
                setExpenses(e);
                getTotalExpense(e);
            })
        } else {
            searchExpenses(search).then(expenses => setExpenses(expenses));
        }
    };

    const handleSearch = (evt) => {
        evt.preventDefault()
        let searchInput = evt.target.value
        setSearch(searchInput)
    };

    const deleteCurrentExpense = (id) => {
        if (window.confirm("Are you sure?")) {
            deleteExpense(id)
                .then(() => getExpenses());
        }
    };

    const getTotalExpense = (expenses) => {
        let total = 0;
        for (let e of expenses) {
            total += e.cost
        }
        setTotalExpense(total);
    }

    useEffect(() => {
        getExpenses();
    }, [search]);



    return (
        <Container>
            <Row>
                <div className="heading">
                    <h1>expenses.</h1>
                </div>
            </Row>
            <Row>
                <Col>
                    <div className="form">
                        <div className="info_box">
                            <input type='text' className="search" required onChange={handleSearch} id="search_box" placeholder="Search By Name" />
                        </div>

                        <Link to="/expense/add">
                            <Button>New Expense</Button>
                        </Link>
                    </div>
                    <div className="info_box">
                        <div className="info_display">
                            <h4>Total Expenses for the year:</h4>
                            <p style={{ color: "Red", fontSize: 25 }}><b>{`$${totalExpense}`}</b></p>

                        </div>
                    </div>

                </Col>

                <Col>

                    {expenses.map((expense) => (
                        <Expense expense={expense} key={expense.id} deleteCurrentExpense={deleteCurrentExpense} />
                    ))}
                </Col>

            </Row>
        </Container >
    )
};
export default ExpenseList;