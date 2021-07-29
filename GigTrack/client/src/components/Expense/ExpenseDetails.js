import React from "react";
import { Card, CardBody, ListGroupItem, ListGroup, Button } from "reactstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getExpenseById } from "../../modules/expenseManager";

const ExpenseDetails = () => {
    const [expense, setExpense] = useState({});
    const { id } = useParams();

    const getExpenseDetails = () => {
        getExpenseById(id)
            .then(setExpense)
    }

    useEffect(() => {
        getExpenseDetails();
    }, []);

    return (
        <>
            <h2 className="text-center">Expense Details </h2>
            <Card className="w-75 mx-auto">
                <CardBody>
                    <h4>{expense.name}</h4>
                    <div>
                        <p>{`$${expense.cost}`}</p>
                        <p>{`Date Purchased: ${expense.date}`}</p>
                    </div>
                    <Link to={`/expense`}>
                        <Button className="btn btn-primary">To Expenses</Button>
                    </Link>
                </CardBody>
            </Card >
        </>
    )
}
export default ExpenseDetails;