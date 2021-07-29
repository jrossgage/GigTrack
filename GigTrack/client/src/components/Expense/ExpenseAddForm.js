import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { addExpense } from '../../modules/expenseManager';

const ExpenseAddForm = () => {
    const emptyExpense = {
        name: "",
        cost: 0,
        date: 0
    };

    const [newExpense, setNewExpense] = useState(emptyExpense);
    const history = useHistory();

    const handleInputChange = (e) => {
        const value = e.target.value;
        const key = e.target.id;

        const expenseCopy = { ...newExpense };

        expenseCopy[key] = value;
        setNewExpense(expenseCopy);
    };

    const handleSave = (e) => {
        e.preventDefault();

        if (newExpense.name === "" || newExpense.cost === 0 || newExpense.date === 0) {
            window.alert(`Please input more information`)

            setNewExpense({
                name: "",
                cost: 0,
                date: 0
            })
            return history.push('/expense/add');
        }
        else {
            addExpense(newExpense).then((e) => {
                history.push(`/expense/details/${e.id}`);
            });
        }
    }

    return (
        <Form className="container w-75">
            <h2>Add a New Expense</h2>
            <FormGroup>
                <Label for="name">Name</Label>
                <Input type="text" name="name" id="name" placeholder="Name"
                    value={newExpense.name}
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
                <Label for="Cost">Cost</Label>
                <Input type="number" name="cost" id="cost" placeholder="Cost"
                    // value={newExpense.cost}
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
                <Label for="date">Date</Label>
                <Input type="date" name="date" id="date" placeholder="date"
                    // value={newExpense.date}
                    onChange={handleInputChange} />
            </FormGroup>


            <Button className="btn btn-primary" onClick={handleSave}>Save</Button>
            <Button className="btn btn-primary" onClick={() => history.push(`/expense`)}>Cancel</Button>

        </Form>
    );
}
export default ExpenseAddForm;