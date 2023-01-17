import React from 'react'
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const SignUpPage = () => {
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [role, setRole] = useState('CLIENT')

    const onCancelSubmit = (e) => {
        e.preventDefault()

        navigate('/', {
        })
    }

    const addClient = async (client) => {
        const res = await fetch(`http://localhost:8080/energy-platform/addclient`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(client)
        }).then(response => response.json())
        .catch(error => error)

        if (res.error) {
            alert(res.error);
        } else {
            navigate('/', {
            })
        }
    }

    const onSignUpSubmit = (e) => {
        e.preventDefault()

        if(!name) {
            alert('Please enter your name')
            return
        }

        if(!username) {
            alert('Please enter your username')
            return
        }

        if(!password) {
            alert('Please enter your password')
            return
        }

        if(!confirmPassword) {
            alert('Please confirm your password')
            return
        }

        if(password === confirmPassword) {
            addClient({name, username, password, role});
        } else {
            alert('Passwords do not match')
            return
        }
    }

    return (
        <div className='container'>
            <h1 style={{ marginLeft : 110}}>Welcome to your Energy Platform!</h1>
            <br></br>
            <form className="add-form">
                <div className="form-control" style={{ marginLeft : 230}}>
                    <label> Name </label>
                    <input  type="text"
                            placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-control" style={{ marginLeft : 230}}>
                    <label> Username </label>
                    <input  type="text"
                            placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-control" style={{ marginLeft : 230}}>
                    <label> Password </label>
                    <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="form-control" style={{ marginLeft : 230}}>
                    <label> Confirm password </label>
                    <input type="password" placeholder="Renter password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                </div>

                <button type="submit" id='btn-sign-up-2' className="btn btn-block" style={{ marginLeft : 220}} onClick={(e) => onSignUpSubmit(e)}>
                    Sign Up
                </button>
                <button type="submit" id='btn-cancel' className="btn btn-block" style={{ marginLeft : 220}} onClick={(e) => onCancelSubmit(e)}>
                    Cancel
                </button>
            </form>
        </div>
    )
}

export default SignUpPage