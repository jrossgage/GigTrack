import React from "react";
import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { Link } from "react-router-dom";
import { dateFixer } from "../../modules/helper";
import "./Expense.css";

const Expense = ({ expense, deleteCurrentExpense }) => {

    const cutDate = dateFixer(expense);

    return (
        <div className="list_expense">
            <Card >
                <CardBody>

                    <Link to={`/expense/details/${expense.id}`}>
                        <CardTitle tag="h5">{expense.name}</CardTitle>
                    </Link>


                    <CardSubtitle><b>{`On ${cutDate}`}</b></CardSubtitle>

                    <CardSubtitle><b>{`Cost: $${expense.cost}`}</b></CardSubtitle>


                    <div>
                        <button className="btn btn-danger" onClick={() => deleteCurrentExpense(expense.id)}>Delete</button>
                        <Link to={`/expense/edit/${expense.id}`}>
                            <button className="btn btn-light  m-2">Edit</button>
                        </Link>
                    </div>

                </CardBody>
            </Card >
        </div>
    )
}
export default Expense;