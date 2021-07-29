import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import GigList from "./Gig/GigList";
import GigDetails from "./Gig/GigDetails";
import GigAddForm from "./Gig/GigAddForm";
import GigEditForm from "./Gig/GigEditForm";
import ExpenseList from "./Expense/ExpenseList";
import ExpenseEditForm from "./Expense/ExpenseEditForm";
import ExpenseAddForm from "./Expense/ExpenseAddForm";
import ExpenseDetails from "./Expense/ExpenseDetails";


export default function ApplicationViews({ isLoggedIn }) {

    return (
        <main>
            <Switch>
                <Route path="/" exact>
                    {isLoggedIn ? <Home /> : <Redirect to="/login" />}
                </Route>

                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/register">
                    <Register />
                </Route>

                <Route path="/gig" exact>
                    {isLoggedIn ? <GigList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/gig/details/:id" exact>
                    {isLoggedIn ? <GigDetails /> : <Redirect to="/login" />}
                </Route>

                <Route path="/gig/edit/:id" exact>
                    {isLoggedIn ? <GigEditForm /> : <Redirect to="/login" />}
                </Route>

                <Route path="/gig/add" exact>
                    {isLoggedIn ? <GigAddForm /> : <Redirect to="/login" />}
                </Route>

                {/* <Route path="/client" exact>
                    {isLoggedIn ? <Home /> : <Redirect to="/login" />}
                </Route>  */}

                <Route path="/expense" exact>
                    {isLoggedIn ? <ExpenseList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/expense/add" exact>
                    {isLoggedIn ? <ExpenseAddForm /> : <Redirect to="/login" />}
                </Route>

                <Route path="/expense/details/:id" exact>
                    {isLoggedIn ? <ExpenseDetails /> : <Redirect to="/login" />}
                </Route>

                <Route path="/expense/edit/:id" exact>
                    {isLoggedIn ? <ExpenseEditForm /> : <Redirect to="/login" />}
                </Route>


            </Switch>
        </main>
    );
};