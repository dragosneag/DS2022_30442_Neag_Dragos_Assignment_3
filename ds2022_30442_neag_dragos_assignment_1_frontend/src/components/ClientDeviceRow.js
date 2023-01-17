import React from 'react'

const ClientDeviceRow = ({device, onClick}) => {
    return (
        <div className = "speciality" style={{color: "#38a280"}}>
            <br></br>
            <h2>
                <div>
                    <button type="submit" id="edit_device_button" style={{ marginLeft: '1100px' }} onClick={(e) => onClick(e, device)}>
                        See device data
                    </button>
                    Name:&emsp;&emsp;
                    <a>{device.name}</a>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                    Address:&emsp;&emsp;
                    <a>{device.address}</a>
                </div>
                <br></br>
                Description:&emsp;&emsp;
                <a>{device.description}</a>
            </h2>
        </div>
    )
}

export default ClientDeviceRow