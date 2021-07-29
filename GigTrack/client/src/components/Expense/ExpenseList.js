import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { getAllExpense, deleteExpense } from '../../modules/expenseManager';
import { Link, useHistory } from "react-router-dom";
import Expense from "../Expense/Expense";

const ExpenseList = () => {

    const [expenses, setExpenses] = useState([]);
    const [totalExpense, setTotalExpense] = useState(0);

    const getExpenses = () => {
        getAllExpense().then(e => {
            setExpenses(e);
            getTotalExpense(e);
        })
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
    }, []);



    return (
        <>
            <div className='container'>
                <div>
                    <h4>Total Expenses for the year:</h4>
                    <p>{`$${totalExpense}`}</p>
                </div>
                <div className="container">

                    <Link to="/expense/add">
                        <button className="btn btn-primary">New Expense</button>
                    </Link>

                </div>
            </div>
            <div className="container">
                <div>
                    {expenses.map((expense) => (
                        <Expense expense={expense} key={expense.id} deleteCurrentExpense={deleteCurrentExpense} />
                    ))}
                </div>
            </div>
        </>
    )
};
export default ExpenseList;