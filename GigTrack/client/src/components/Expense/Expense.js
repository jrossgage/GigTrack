import React from "react";
import { Card, Cardbody, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { dateFixer } from "../../modules/helper";

const Expense = ({ expense, deleteCurrentExpense }) => {

    const cutDate = dateFixer(expense);

    return (
        <Card >
            <div>

                <p><b><Link to={`/expense/details/${expense.id}`}>{expense.name}</Link></b></p>


                <p><b>{`On ${cutDate}`}</b></p>

                <p>{`Cost: $${expense.cost}`}</p>


                <div>
                    <button className="btn btn-danger" onClick={() => deleteCurrentExpense(expense.id)}>Delete</button>
                    <Link to={`/expense/edit/${expense.id}`}>
                        <button className="btn btn-light  m-2">Edit</button>
                    </Link>
                </div>

            </div>
        </Card >
    )
}
export default Expense;