import React, { useState } from 'react';
import { NavLink as RRNavLink, Link } from "react-router-dom";
// import {
//     Collapse,
//     Navbar,
//     NavbarToggler,
//     NavbarBrand,
//     Nav,
//     NavItem,
//     NavLink
// } from 'reactstrap';
import "./Header.css";
import { logout } from "../modules/authManager";

export default function Header({ isLoggedIn }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <nav className={isOpen ? "sidebar active" : "sidebar"}>
            <button className="hamburger" type="button" onClick={toggle}>
                <div></div>
                <div></div>
                <div></div>
            </button>
            <li><Link to="/">gig track.</Link></li>
            <ul onClick={toggle}>
                {isLoggedIn &&
                    <>
                        <hr></hr>
                        <li><Link to="/gig">gigs</Link></li>
                        <li><Link to="/client">clients</Link></li>
                        <li><Link to="/expense">expense</Link></li>
                        <hr></hr>
                        <li><Link onClick={logout}>logout</Link></li>
                    </>
                }
                {!isLoggedIn &&
                    <>
                        <hr></hr>
                        <li><Link to="/login">login</Link></li>
                        <li><Link to="/register">register</Link></li>
                    </>}
            </ul>
        </nav>

        // <div>
        //     <Navbar color="dark" dark expand="md">
        //         <NavbarBrand tag={RRNavLink} to="/">gig track.</NavbarBrand>
        //         <NavbarToggler onClick={toggle} />
        //         <Collapse isOpen={isOpen} navbar>
        //             <Nav className="mr-auto" navbar>
        //                 {isLoggedIn &&
        //                     <>
        //                         <NavItem>
        //                             <NavLink tag={RRNavLink} to="/gig">Gigs</NavLink>
        //                         </NavItem>
        //                         <NavItem>
        //                             <NavLink tag={RRNavLink} to="/client">Clients</NavLink>
        //                         </NavItem>
        //                         <NavItem>
        //                             <NavLink tag={RRNavLink} to="/expense">Expenses</NavLink>
        //                         </NavItem>
        //                         <NavItem>
        //                             <a aria-current="page" className="nav-link"
        //                                 style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
        //                         </NavItem>
        //                     </>
        //                 }
        //                 {!isLoggedIn &&
        //                     <>
        //                         <NavItem>
        //                             <NavLink tag={RRNavLink} to="/login">Login</NavLink>
        //                         </NavItem>
        //                         <NavItem>
        //                             <NavLink tag={RRNavLink} to="/register">Register</NavLink>
        //                         </NavItem>
        //                     </>
        //                 }
        //             </Nav>

        //         </Collapse>
        //     </Navbar>
        // </div>
    );
}