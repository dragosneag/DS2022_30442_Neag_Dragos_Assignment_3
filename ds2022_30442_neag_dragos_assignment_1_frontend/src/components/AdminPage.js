import React, { Component }  from 'react'
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
import ClientRow from './ClientRow'
import DeviceRow from './DeviceRow'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import logo from '../Logo.png'
import axios from 'axios'
import {useRef} from 'react'

const AdminPage = () => {

    const {state} = useLocation()
    const admin = state.admin
    const navigate = useNavigate()

    const [clients, setClients] = useState([])
    const [devices, setDevices] = useState([])

    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [role, setRole] = useState('CLIENT')
    const [currentClient, setCurrentClient] = useState('')
    const [description, setDescription] = useState('')
    const [address, setAddress] = useState('')
    const [maxHourlyConsumption, setMaxConsumption] = useState('')
    const [clientDevices, setClientDevices] = useState([])
    const [selectedDevice, setSelectedDevice] = useState('')

    const defaultOption = 'Add device';

    const fetchClients = async () => {
        const res = await fetch(`http://localhost:8080/energy-platform/clients`)
        const data = await res.json()

        return data
    }

    useEffect(() => {
        const getClients = async () => {
            const clientsFromLocal = await fetchClients()
            console.log(clientsFromLocal)
            setClients(clientsFromLocal)
        }

        getClients()
    }, [])

    const fetchDevices = async () => {
        const res = await fetch(`http://localhost:8080/energy-platform/devices`)
        const data = await res.json()

        return data
    }

    useEffect(() => {
        const getDevices = async () => {
            const devicesFromLocal = await fetchDevices()
            console.log(devicesFromLocal)
            setDevices(devicesFromLocal)
        }

        getDevices()
    }, [])

    const onLogOutSubmit = (e) => {
        e.preventDefault()

        navigate('/', {
        })
    }

    const updateClient = async (client) => {
        console.log(client);
        const res = await fetch(`http://localhost:8080/energy-platform/updateclient`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(client)
        }).then(response => response.json())
        .catch(error => error)

        if (res.error) {
            alert(res.error);
        } else {
            document.getElementById("edit_client").style.display = 'none';
            document.getElementById("read_clients").style.display = 'block';
            const clientsFromLocal = await fetchClients();
            setClients(clientsFromLocal);
        }
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
            document.getElementById("create_client").style.display = 'none';
            document.getElementById("read_clients").style.display = 'block';
            const clientsFromLocal = await fetchClients();
            setClients(clientsFromLocal);
        }
    }

    const deleteClient = async (client) => {
        console.log(client);
        const res = await fetch(`http://localhost:8080/energy-platform/deleteclient`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(client)
        }).then(response => response.json())
        .catch(error => error)

        if (res.error) {
            alert(res.error);
        } else {
            document.getElementById("edit_client").style.display = 'none';
            document.getElementById("read_clients").style.display = 'block';
            const clientsFromLocal = await fetchClients();
            setClients(clientsFromLocal);
        }
    }

    const updateDevice = async (device) => {
        console.log(device);
        const res = await fetch(`http://localhost:8080/energy-platform/updatedevice`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(device)
        }).then(response => response.json())
        .catch(error => error)

        if (res.error) {
            alert(res.error);
        } else {
            document.getElementById("edit_device").style.display = 'none';
            document.getElementById("create_device").style.display = 'none';
            document.getElementById("read_devices").style.display = 'block';
            const devicesFromLocal = await fetchDevices();
            setDevices(devicesFromLocal);
        }
    }

    const addDevice = async (device) => {
        const res = await fetch(`http://localhost:8080/energy-platform/adddevice`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(device)
        }).then(response => response.json())
        .catch(error => error)

        if (res.error) {
            alert(res.error);
        } else {
            document.getElementById("edit_device").style.display = 'none';
            document.getElementById("create_device").style.display = 'none';
            document.getElementById("read_devices").style.display = 'block';
            const devicesFromLocal = await fetchDevices();
            setDevices(devicesFromLocal);
        }
    }

    const deleteDevice = async (device) => {
        console.log(device);
        const res = await fetch(`http://localhost:8080/energy-platform/deletedevice`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(device)
        }).then(response => response.json())
        .catch(error => error)

        if (res.error) {
            alert(res.error);
        } else {
            document.getElementById("edit_device").style.display = 'none';
            document.getElementById("read_devices").style.display = 'block';
            const devicesFromLocal = await fetchDevices();
            setDevices(devicesFromLocal);
        }
    }

    const addDeviceToClient = async () => {
        const clientUsername = username;
        const deviceName = selectedDevice;
        const res = await fetch(`http://localhost:8080/energy-platform/clients/adddevice/${clientUsername}/${deviceName}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            }
        }).then(response => response.json())
        .catch(error => error)

        if (res.error) {
            alert(res.error);
        } else {
            document.getElementById("edit_client").style.display = 'none';
            document.getElementById("read_clients").style.display = 'block';
            const clientsFromLocal = await fetchClients();
            setClients(clientsFromLocal);
        }
    }

    const onEditClientSubmit = (e, client) => {
        e.preventDefault();

        console.log(client);

        document.getElementById("read_clients").style.display = 'none';
        document.getElementById("edit_client").style.display = 'block';
        setName(client.name);
        setUsername(client.username);
        setId(client.id)
        setPassword(client.password);
        setCurrentClient(client);
        setClientDevices(client.devices);
    }

    const onCreateClientSubmit = (e) => {
        e.preventDefault();

        setName('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        document.getElementById("read_clients").style.display = 'none';
        document.getElementById("create_client").style.display = 'block';
    }

    const onUpdateSubmit = (e) => {
        e.preventDefault()

        if(!name) {
            alert('Please enter your name')
            return
        }

        if(!username) {
            alert('Please enter your username')
            return
        }
        updateClient({id, name, username, password, role});
    }

    const onCreateSubmit = (e) => {
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

    const onCancelSubmit = (e) => {
        e.preventDefault();
        document.getElementById("edit_client").style.display = 'none';
        document.getElementById("create_client").style.display = 'none';
        document.getElementById("read_clients").style.display = 'block';
    }

    const onDeleteSubmit = (e) => {
        e.preventDefault();
        deleteClient({id, name, username, password, role});
    }

    const onEditDeviceSubmit = (e, device) => {
        e.preventDefault();

        console.log(device);

        document.getElementById("read_devices").style.display = 'none';
        document.getElementById("edit_device").style.display = 'block';
        setId(device.id);
        setName(device.name);
        setDescription(device.description);
        setAddress(device.address);
    }

    const onCreateDeviceSubmit = (e) => {
        e.preventDefault();

        setName('');
        setDescription('');
        setAddress('');
        document.getElementById("read_devices").style.display = 'none';
        document.getElementById("create_device").style.display = 'block';
    }

    const onDeviceUpdateSubmit = (e) => {
        e.preventDefault()

        if(!name) {
            alert('Please enter device name')
            return
        }

        if(!description) {
            alert('Please enter device description')
            return
        }
        
        if(!address) {
            alert('Please enter device address')
            return
        }

        if(!maxHourlyConsumption) {
            alert('Please enter maximum hourly consumption')
            return
        }
        updateDevice({id, name, description, address, maxHourlyConsumption});
    }

    const onDeviceCreateSubmit = (e) => {
        e.preventDefault()

        if(!name) {
            alert('Please enter device name')
            return
        }

        if(!description) {
            alert('Please enter device description')
            return
        }
        
        if(!address) {
            alert('Please enter device address')
            return
        }

        if(!maxHourlyConsumption) {
            alert('Please enter maximum hourly consumption')
            return
        }

        addDevice({name, description, address, maxHourlyConsumption});
    }

    const onDeviceCancelSubmit = (e) => {
        e.preventDefault();
        document.getElementById("edit_device").style.display = 'none';
        document.getElementById("create_device").style.display = 'none';
        document.getElementById("read_devices").style.display = 'block';
    }

    const onDeviceDeleteSubmit = (e) => {
        e.preventDefault();
        deleteDevice({id, name, description, address});
    }

    const onChangeToClients = (e) => {
        e.preventDefault();
        document.getElementById("edit_client").style.display = 'none';
        document.getElementById("create_client").style.display = 'none';
        document.getElementById("read_clients").style.display = 'block';
        document.getElementById("edit_device").style.display = 'none';
        document.getElementById("create_device").style.display = 'none';
        document.getElementById("read_devices").style.display = 'none';
    }

    const onChangeToDevices = (e) => {
        e.preventDefault();
        document.getElementById("edit_client").style.display = 'none';
        document.getElementById("create_client").style.display = 'none';
        document.getElementById("read_clients").style.display = 'none';
        document.getElementById("edit_device").style.display = 'none';
        document.getElementById("create_device").style.display = 'none';
        document.getElementById("read_devices").style.display = 'block';
    }

    const handleSelect = (e)=>{
        console.log(e.value.id)
        setSelectedDevice(e.value);
    }

    const onAddDeviceSubmit = (e) => {
        e.preventDefault()

        addDeviceToClient();
    }

    const onChatSubmit = (e) => {
        e.preventDefault()

        navigate('/chat-page', {
            state: {
                username: admin.username
            }
        })
    }

    return (
        <div>
            <div className = "row">
                <img src= {logo} alt = "Logo" width={80} height = {80} style={{ marginLeft : 50, marginTop: 20}} />
                <div style={{color: '#38a280', fontFamily : 'less', marginLeft : 400, fontSize : 50}}>Energy Platform</div>
                <button className = "btn" style = {{marginLeft : 370}} type="submit" id='btn-chat-admin' onClick={(e) => onChatSubmit(e)}>
                    Admin chat
                </button>
                <button className = "btn" style = {{marginLeft : 20}} type="submit" id='btn-log-out' onClick={(e) => onLogOutSubmit(e)}>
                    Log out
                </button>
            </div>
            <div>
                <nav>
                    <ul>
                        <li>
                            <a href="javascript: void(0)" id="client_menu" onClick={(e) => onChangeToClients(e)}>Clients</a>
                        </li>
                        <li>
                            <a href="javascript: void(0)" id="device_menu" onClick={(e) => onChangeToDevices(e)}>Devices</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div>
                <div className = "container-2">
                    <div id="read_clients" >
                        <button className = "btn btn-block" style = {{marginLeft : 5, width: 1330, fontSize: 20}} type="submit" id='btn-create' onClick={(e) => onCreateClientSubmit(e)}>
                            Create client
                        </button>
                        <br></br>
                        {clients.map((client) => (
                            <ClientRow client={client} onClick = {(e, client) => onEditClientSubmit(e, client)}/>
                        ))}
                    </div>
                    <div id="edit_client" style={{display : 'none'}}>
                        <form className="add-form" style={{ marginTop : 70 }}>
                            <div className="form-control">
                                <label  style={{ marginLeft : 370 }}> Name </label>
                                <input  style={{ marginLeft : 370, width: 530 }} type="text"
                                        placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="form-control">
                                <label style={{ marginLeft : 370 }}> Username </label>
                                <input  style={{ marginLeft : 370, width: 530 }} type="text"
                                        placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="form-control">
                                <label style={{ marginLeft : 370 }}> Devices </label>
                            </div>
                            {clientDevices.map((device) => (
                                <p id="device_paragraph" style={{ marginLeft : 370 }}>{device.name}</p>
                            ))}
                            <br></br>
                            <div style={{ marginLeft : 370, width: '530px'}}>
                                <Dropdown options={devices.map((device) => (device.name))} onChange = {handleSelect}  value={defaultOption} placeholder="Select an option"></Dropdown>
                            </div>
                            <br></br>
                            <button type="submit" id='btn-sign-up-2' className="btn btn-block" style={{ marginLeft : 370}} onClick={(e) => onAddDeviceSubmit(e)}>
                                Add device
                            </button>
                            <br></br>
                            <button type="submit" id='btn-sign-up-2' className="btn btn-block" style={{ marginLeft : 370}} onClick={(e) => onUpdateSubmit(e)}>
                                Update
                            </button>
                            <button type="submit" id='btn-delete' className="btn btn-block" style={{ marginLeft : 370}} onClick={(e) => onDeleteSubmit(e)}>
                                Delete client
                            </button>
                            <br></br>
                            <button type="submit" id='btn-cancel' className="btn btn-block" style={{ marginLeft : 370}} onClick={(e) => onCancelSubmit(e)}>
                                Cancel
                            </button>
                        </form>
                    </div>
                    <div id="create_client" style={{display : 'none'}}>
                        <form className="add-form" style={{ marginTop : 70 }}>
                            <div className="form-control">
                                <label  style={{ marginLeft : 370 }}> Name </label>
                                <input  style={{ marginLeft : 370, width: 530 }} type="text"
                                        placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="form-control">
                                <label style={{ marginLeft : 370 }}> Username </label>
                                <input  style={{ marginLeft : 370, width: 530 }} type="text"
                                        placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="form-control">
                                <label style={{ marginLeft : 370 }}> Password </label>
                                <input style={{ marginLeft : 370, width: 530 }} type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <div className="form-control">
                                <label style={{ marginLeft : 370 }}> Confirm password </label>
                                <input style={{ marginLeft : 370, width: 530 }} type="password" placeholder="Renter password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                            </div>
                            <button type="submit" id='btn-sign-up-2' className="btn btn-block" style={{ marginLeft : 370}} onClick={(e) => onCreateSubmit(e)}>
                                Create
                            </button>
                            <br></br>
                            <button type="submit" id='btn-cancel' className="btn btn-block" style={{ marginLeft : 370}} onClick={(e) => onCancelSubmit(e)}>
                                Cancel
                            </button>
                        </form>
                    </div>
                    <div id="read_devices" style={{display : 'none'}}>
                        <button className = "btn btn-block" style = {{marginLeft : 5, width: 1330, fontSize: 20}} type="submit" id='btn-create' onClick={(e) => onCreateDeviceSubmit(e)}>
                            Create device
                        </button>
                        <br></br>
                        {devices.map((device) => (
                            <DeviceRow device={device} onClick = {(e, device) => onEditDeviceSubmit(e, device)}/>
                        ))}
                    </div>
                    <div id="edit_device" style={{display : 'none'}}>
                        <form className="add-form" style={{ marginTop : 70 }}>
                            <div className="form-control">
                                <label  style={{ marginLeft : 370 }}> Name </label>
                                <input  style={{ marginLeft : 370, width: 530 }} type="text"
                                        placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="form-control">
                                <label style={{ marginLeft : 370 }}> Description </label>
                                <input  style={{ marginLeft : 370, width: 530 }} type="text"
                                        placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <div className="form-control">
                                <label  style={{ marginLeft : 370 }}> Address </label>
                                <input  style={{ marginLeft : 370, width: 530 }} type="text"
                                        placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            <div className="form-control">
                                <label  style={{ marginLeft : 370 }}> Maximum hourly consumption </label>
                                <input  style={{ marginLeft : 370, width: 530 }} type="text"
                                        placeholder="Enter maximum hourly consumption value" value={maxHourlyConsumption} onChange={(e) => setMaxConsumption(e.target.value)} />
                            </div>

                            <button type="submit" id='btn-sign-up-2' className="btn btn-block" style={{ marginLeft : 370}} onClick={(e) => onDeviceUpdateSubmit(e)}>
                                Update
                            </button>
                            <button type="submit" id='btn-delete' className="btn btn-block" style={{ marginLeft : 370}} onClick={(e) => onDeviceDeleteSubmit(e)}>
                                Delete device
                            </button>
                            <br></br>
                            <button type="submit" id='btn-cancel' className="btn btn-block" style={{ marginLeft : 370}} onClick={(e) => onDeviceCancelSubmit(e)}>
                                Cancel
                            </button>
                        </form>
                    </div>
                    <div id="create_device" style={{display : 'none'}}>
                        <form className="add-form" style={{ marginTop : 70 }}>
                        <div className="form-control">
                                <label  style={{ marginLeft : 370 }}> Name </label>
                                <input  style={{ marginLeft : 370, width: 530 }} type="text"
                                        placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="form-control">
                                <label style={{ marginLeft : 370 }}> Description </label>
                                <input  style={{ marginLeft : 370, width: 530 }} type="text"
                                        placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <div className="form-control">
                                <label  style={{ marginLeft : 370 }}> Address </label>
                                <input  style={{ marginLeft : 370, width: 530 }} type="text"
                                        placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            <div className="form-control">
                                <label  style={{ marginLeft : 370 }}> Maximum hourly consumption </label>
                                <input  style={{ marginLeft : 370, width: 530 }} type="text"
                                        placeholder="Enter maximum hourly consumption value" value={maxHourlyConsumption} onChange={(e) => setMaxConsumption(e.target.value)} />
                            </div>
                        

                            <button type="submit" id='btn-sign-up-2' className="btn btn-block" style={{ marginLeft : 370}} onClick={(e) => onDeviceCreateSubmit(e)}>
                                Create
                            </button>
                            <br></br>
                            <button type="submit" id='btn-cancel' className="btn btn-block" style={{ marginLeft : 370}} onClick={(e) => onDeviceCancelSubmit(e)}>
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminPage