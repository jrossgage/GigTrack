import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { getExpenseById, updateExpense } from '../../modules/expenseManager';
import { momentDateFixer } from '../../modules/helper';

const ExpenseEditForm = () => {
    const [editExpense, setEditExpense] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const { id } = useParams();
    const history = useHistory();

    const handleInputChange = (e) => {
        const value = e.target.value;
        const key = e.target.id;

        const expenseCopy = { ...editExpense };

        expenseCopy[key] = value;
        setEditExpense(expenseCopy);
    };

    const getEditExpenseById = () => {
        return getExpenseById(id).then(expense => {
            let editedExpense = expense
            editedExpense.date = momentDateFixer(expense)
            setEditExpense(editedExpense);
            setIsLoading(false)
        })
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const editedExpense = {
            id: id,
            name: editExpense.name,
            cost: editExpense.cost,
            date: editExpense.date,
        };
        updateExpense(editedExpense)
            .then((e) => {
                history.push(`/expense/details/${editedExpense.id}`);
            });
    };

    const handleDate = (event) => {
        event.preventDefault();
        let editedExpense = { ...editExpense };

        let editDate = event.target.value
        editedExpense[event.target.id] = editDate
        setEditExpense(editedExpense)
    }

    useEffect(() => {
        getEditExpenseById();
    }, [id])

    return (
        <Form className="container w-75">
            <h2>Edit Expense</h2>
            <FormGroup>
                <Label for="Name">Name</Label>
                <Input type="text" name="name" id="name" placeholder="Name"
                    value={editExpense.name}
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
                <Label for="cost">Cost</Label>
                <Input type="number" name="cost" id="cost" placeholder="cost"
                    value={editExpense.cost}
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
                <Label for="date">Date</Label>
                <Input type="date" name="date" id="date" placeholder="date" defaultValue={momentDateFixer(editExpense)} format="YYYY-MM-DD"
                    value={editExpense.date}
                    onChange={handleDate} />
            </FormGroup>

            <Button className="btn btn-primary" onClick={handleUpdate}>Save</Button>
            <Button className="btn btn-primary" onClick={() => history.push(`/expense`)}>Cancel</Button>

        </Form>
    )
}
export default ExpenseEditForm;