import React from "react";
import { Card, CardBody, Container, ListGroupItem, Row, ListGroup, Button } from "reactstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getExpenseById } from "../../modules/expenseManager";
import { dateFixer } from "../../modules/helper";

const ExpenseDetails = () => {
    const [expense, setExpense] = useState({});
    const { id } = useParams();

    const cutDate = dateFixer(expense);

    const getExpenseDetails = () => {
        getExpenseById(id)
            .then(setExpense)
    }

    useEffect(() => {
        getExpenseDetails();
    }, []);

    return (
        <Container>
            <Row>
                <div className="heading">
                    <h1>expense details.</h1>
                </div>
            </Row>

            <div className="box_details">
                <Card>
                    <CardBody>
                        <h4>{expense.name}</h4>
                        <div>
                            <p><b>Cost </b></p><p style={{ color: "red" }}><b>{`$${expense.cost}`}</b></p>
                            <p>{`Date Purchased: ${cutDate}`}</p>
                        </div>
                        <Link to={`/expense`}>
                            <Button className="btn btn-primary">To Expenses</Button>
                        </Link>
                    </CardBody>
                </Card >
            </div>
        </Container>
    )
}
export default ExpenseDetails;