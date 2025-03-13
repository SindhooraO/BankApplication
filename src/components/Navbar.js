import React from "react";
import {Link} from "react-router-dom";

const Nav=()=>{
    return(
        <>
        <div className="nav">
      <div className="head" ><h4>BankApp</h4></div>
      <Link to="/">Home</Link> <br />
      <Link to="/register">Register</Link> <br />
      <Link to="/services">Services</Link> <br />
      <Link to="/profile">Profile</Link> <br />
      <Link to="/transactions">Transactions</Link>
    </div>
        </>
    )
}
export default Nav;