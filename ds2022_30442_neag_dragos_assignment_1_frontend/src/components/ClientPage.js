import React from 'react'
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
import ClientDeviceRow from './ClientDeviceRow'
import logo from '../Logo.png'
import axios from 'axios'
import {useRef} from 'react'

const ClientPage = () => {

    const {state} = useLocation()
    const client = state.client
    const navigate = useNavigate()

    const [devices, setDevices] = useState([])

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [address, setAddress] = useState('')
    const [hours, setHours] = useState([1, 2, 3, 4, 5])
    const [consumValues, setConsumValues] = useState([0, 0, 0, 0, 0])

    var chartConfig = {
        options: {
          chart: {
            id: "basic-bar"
          },
          xaxis: {
            categories: hours
          }
        },
        series: [
          {
            name: "Energy Consumption",
            data: consumValues
          }
        ]
    };
    var [stateChart, setStateChart] = useState(chartConfig);

    const fetchDevices = async () => {
        const res = await fetch(`http://localhost:8080/energy-platform/clients/${client.username}/devices`)
        const data = await res.json()

        return data
    }

    useEffect(() => {
        const getDevices = async () => {
            console.log(client);
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

    const onSeeDataSubmit = (e, device) => {
        e.preventDefault()

        navigate('/chart-page', {
            state: {
                device: device,
                client: client
            }
        })
    }

    const onChatSubmit = (e) => {
        e.preventDefault()

        navigate('/chat-page', {
            state: {
                username: client.username
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
                <div className = "container-2">
                    <div id="read_devices" style={{display : 'block'}}>
                        <br></br>
                        {devices.map((device) => (
                            <ClientDeviceRow device={device} onClick = {(e, device) => onSeeDataSubmit(e, device)}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClientPage