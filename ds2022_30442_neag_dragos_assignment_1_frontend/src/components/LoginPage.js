import React, { Component }  from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import logo from '../Logo.png'

const LoginPage = () => {

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [accountType, setAccountType] = useState('');

    const handleCustomerChange = () => {
        setAccountType('client')
    };

    const handleAdminChange = () => {
        setAccountType('admin')
    };

    const fetchClient = async () => {
        const params = new URLSearchParams([['username', username], ['password', password]]);
        const res = await axios.get('http://localhost:8080/energy-platform/clients/login-client', {params});

        const client = res.data

        if (client) {
            return client
        } else {
            alert('Invalid username or password')
            return
        }
    }

    const fetchAdmin = async () => {
        const params = new URLSearchParams([['username', username], ['password', password]]);
        const res = await axios.get('http://localhost:8080/energy-platform/admins/login-admin', {params});
        
        const admin = res.data

        if (admin) {
            return admin
        } else {
            alert('Invalid username or password')
            return
        }
    }

    const onLoginSubmit = async (e) => {
        e.preventDefault();

        if(!username) {
            alert('Please enter your username')
            return
        }

        if(!password) {
            alert('Please enter your password')
            return
        }

        if(!accountType) {
            alert('Please select account type')
            return
        }

        if (accountType === "client"){

            const client = await fetchClient();

            if (client) {
                console.log("Success client!");
                navigate('/client-page', {
                    state: {
                        client: client
                    }
                })
            }
        } else {
            if (accountType === "admin"){
                const admin = await fetchAdmin();

                if (admin) {
                    console.log("Success admin!");
                    navigate('/admin-page', {
                        state: {
                            admin: admin
                        }
                    })
                }
            }
        }
    }

    const onSignUpSubmit = async (e) => {
        e.preventDefault();

        navigate('/register-page')
    }

    return (
        <div className='container'>
            <img src= {logo} alt = "Logo" width={250} height = {250} style={{ marginLeft : 250}} />
            <div>
            <form className="add-form">
                <div className="form-control" style={{ marginLeft : 250}}>
                    <label> Username </label>
                    <input  type="text"
                            placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-control" style={{ marginLeft : 250}}>
                    <label> Password </label>
                    <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div style={{ marginLeft : 160}}>
                    <RadioButton
                    label="Client"
                    marginLeft = {120}
                    value={accountType === 'client'}
                    onChange={handleCustomerChange}
                />
                    <RadioButton
                    label="Admin"
                    marginLeft = {30}
                    value={accountType === 'admin'}
                    onChange={handleAdminChange}
                />
                <br></br>
                <br></br>
                </div>
                <button type="submit" id='btn-login' className="btn btn-block" style={{ marginLeft : 230}} onClick={(e) => onLoginSubmit(e)}>
                    Log In
                </button>
                <br></br>
                <div style={{ marginLeft : 220}}>
                    <label> You don't have an account yet? Sign up! </label>
                </div>
                <br></br>
                <button type="submit" id='btn-sign-up' className="btn btn-block" style={{ marginLeft : 230}} onClick={(e) => onSignUpSubmit(e)}>
                    Sign Up
                </button>
            </form></div>
        </div>
    )
}

const RadioButton = ({ label, value, onChange, marginLeft }) => {
    return (
        <label>
            <input type="radio" style={{ marginLeft : marginLeft }} checked={value} onChange={onChange} />
            {label}
        </label>
    );
};

export default LoginPage