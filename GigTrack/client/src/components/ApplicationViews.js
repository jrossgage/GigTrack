import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import GigList from "./Gig/GigList";

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

                {/* <Route path="/client" exact>
                    {isLoggedIn ? <Home /> : <Redirect to="/login" />}
                </Route>

                <Route path="/expense" exact>
                    {isLoggedIn ? <Home /> : <Redirect to="/login" />}
                </Route> */}

            </Switch>
        </main>
    );
};