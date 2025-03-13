import React, { useState, useEffect, Component } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Nav from './components/Navbar';

const users = [];
const transactions = [];

function MainPage() {
  return (
    <>
<Nav/>
    <h1>Welcome to Simple Bank</h1>
    <p>
        Experience seamless and secure banking with our platform. Manage your transactions, 
        check your balance, and explore various financial services effortlessly.
      </p>
      <p>
        Whether you're making payments, tracking expenses, or planning your savings, 
        we provide all the tools you need for a hassle-free banking experience.
      </p>    </>
  );
}

function RegistrationPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { username, password, balance: 0 };
    users.push(newUser);
    localStorage.setItem("loggedInUser", JSON.stringify(newUser));
    alert("Registration successful!");
    navigate("/services");
  };

  return (
    <div>
    <Nav/>
            {/* <Link to="/">Back to Main</Link> */}

      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

function ServicesPage() {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleDeposit = () => {
    if (!loggedInUser) return;
    const userIndex = users.findIndex((user) => user.username === loggedInUser.username);
    if (userIndex !== -1) {
      const amount = parseInt(depositAmount) || 0;
      users[userIndex].balance += amount;
      transactions.push({ user: loggedInUser.username, type: "deposit", amount });
      setLoggedInUser(users[userIndex]);
      localStorage.setItem("loggedInUser", JSON.stringify(users[userIndex]));
      alert(`Deposited ${amount}. New Balance: ${users[userIndex].balance}`);
    }
  };

  const handleWithdraw = () => {
    if (!loggedInUser) return;
    const userIndex = users.findIndex((user) => user.username === loggedInUser.username);
    const amount = parseInt(withdrawAmount) || 0;
    if (userIndex !== -1 && users[userIndex].balance >= amount) {
      users[userIndex].balance -= amount;
      transactions.push({ user: loggedInUser.username, type: "withdraw", amount });
      setLoggedInUser(users[userIndex]);
      localStorage.setItem("loggedInUser", JSON.stringify(users[userIndex]));
      alert(`Withdrawn ${amount}. New Balance: ${users[userIndex].balance}`);
    } else {
      alert("Insufficient funds or user not found.");
    }
  };

  return (
    <div>
        <Nav/>

            {/* <Link to="/">Back to Main</Link> */}

      <h1>Services</h1>
      <div>
        <h2>Deposit</h2>
        <input
        className="inpBox"
          type="number"
          placeholder="Amount"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
        />
        <button onClick={handleDeposit}>Deposit</button>
      </div>
      <div>
        <h2>Withdraw</h2>
        <input
                className="inpBox"
          type="number"
          placeholder="Amount"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(e.target.value)}
        />
        <button onClick={handleWithdraw}>Withdraw</button>
      </div>
    </div>
  );
}

function ProfilePage() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    } else {
      navigate("/");
    }
  }, [navigate]);

  if (!loggedInUser) return null;

  return (
    <div>
          <Nav/>

            {/* <Link to="/">Back to Main</Link> */}
      <h1>Profile</h1>
      <p>Username: {loggedInUser.username}</p>
      <p>Balance: {loggedInUser.balance}</p>
    </div>
  );
}

function TransactionPage() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    } else {
      navigate("/");
    }
  }, [navigate]);

  if (!loggedInUser) return null;

  const userTransactions = transactions.filter((transaction) => transaction.user === loggedInUser.username);

  return (
    <div>
      
      <Nav/>

      {/* <Link to="/">Back to Main</Link> */}
      <h1>Transactions</h1>
      <center>
      <ul>
        {userTransactions.map((transaction, index) => (
          <li className="transaction" key={index}>{transaction.type}: {transaction.amount}</li>
        ))}
      </ul></center>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/transactions" element={<TransactionPage />} />
      </Routes>
    </Router>
  );
}

export default App;