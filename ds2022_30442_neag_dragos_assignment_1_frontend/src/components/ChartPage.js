import React, { Component }  from 'react'
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
import ClientDeviceRow from './ClientDeviceRow'
import ReactApexChart from "react-apexcharts"
import logo from '../Logo.png'
import axios from 'axios'
import {useRef} from 'react'
import DatePicker from "react-datepicker"
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'

import "react-datepicker/dist/react-datepicker.css"
import SocketComponent from './SocketComponent'

const ChartPage = () => {

    const {state} = useLocation()
    const client = state.client
    const device = state.device
    const navigate = useNavigate()

    const [deviceData, setDeviceData] = useState([])
    const [startDate, setStartDate] = useState(new Date())

    var hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    var detailsData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
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
            data: detailsData
          }
        ]
    };
    var [stateChart, setStateChart] = useState(chartConfig);


    const fetchDeviceData = async () => {
        const name = device.name
        const client_id = client.id
        const res = await fetch(`http://localhost:8080/energy-platform/devices/${name}/${client_id}/details`)
        const data = await res.json()
        var index = 0;
        data.forEach(data => {
            detailsData[index] = parseInt(data.consumption);
            index = index + 1;
        })
        setStateChart(chartConfig);

        return data
    }

    useEffect(() => {
        const getDeviceData = async () => {
            const deviceDataFromLocal = await fetchDeviceData()
            setDeviceData(deviceDataFromLocal)
        }
        getDeviceData();
    }, [])

    const onLogOutSubmit = (e) => {
        e.preventDefault()

        navigate('/', {
        })
    }

    const onBackSubmit = (e) => {
        e.preventDefault()
        navigate('/client-page', {
            state: {
                client: client
            }
        })
    }

    const onShowSubmit = async (e) => {
        e.preventDefault()
        
        const name = device.name
        const client_id = client.id
        var index = 0
        fetch(`http://localhost:8080/energy-platform/devices/${name}/${client_id}/details`)
            .then(response => response.json())
            .then(body => {
                console.log(body);
                setDeviceData(body);

                var formatDate = startDate.getFullYear() + '-'
                if(startDate.getMonth() < 9) {
                    formatDate += '0'
                }
                formatDate += (startDate.getMonth() + 1) + '-'
                if(startDate.getDate() < 10) {
                    formatDate += '0'
                }
                formatDate += startDate.getDate()
                body.forEach(consumption => {
                    console.log(consumption.timestamp.substring(0, 10))
                    console.log(formatDate)
                    if (consumption.timestamp.substring(0, 10) === formatDate) {
                        detailsData[index] = parseInt(consumption.consumption);
                        index = index + 1;
                    }
                })
                setStateChart(chartConfig);
            });
    }

    // useEffect(() => {
    //     var socket = new SockJS('http://localhost:8080/energy-platform/websocket');

    //     this.stompClient = Stomp.over(socket);  
    //     console.log("this is stomp" + this.stompClient)
    //     var self = this;
    //     this.stompClient.connect({}, function(frame) {
    //         //setConnected(true);
    //         console.log('Connected to this thing: ' + frame);
    //         this.subscribe('/topic/messages', function(payload) {

    //             let node = JSON.parse(payload.body)

    //             console.log(node)
                        
    //             // self.assignedDevices.forEach(item => {
    //             //     if (item.id == node.deviceId)
    //             //         alert("The device: " + node.deviceId + " has exceeded limit of consumption with current consumption being: " + node.currentConsumption)
    //             // })
    //         });
    //     });
    // }, [])

    return (
        <div>
            <div className = "row">
                <img src= {logo} alt = "Logo" width={80} height = {80} style={{ marginLeft : 50, marginTop: 20}} />
                <div style={{color: '#38a280', fontFamily : 'less', marginLeft : 400, fontSize : 50}}>Energy Platform</div>
                <button className = "btn" style = {{marginLeft : 520}} type="submit" id='btn-log-out' onClick={(e) => onLogOutSubmit(e)}>
                    Log out
                </button>
            </div>
            <div>
                <div className = "container-2">
                    <button className = "btn" style = {{marginLeft : 1250}} type="submit" id='btn-back' onClick={(e) => onBackSubmit(e)}>
                        Back
                    </button>
                    <SocketComponent/>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                    <br></br>
                    <br></br>
                    <div id="chart">
                        <ReactApexChart options={stateChart.options} series={stateChart.series} type="bar" height={400} width={1300} />
                    </div>
                    <br></br>
                    <button className = "btn" style = {{marginLeft : 1250}} type="submit" id='btn-show' onClick={(e) => onShowSubmit(e)}>
                        Show
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChartPage