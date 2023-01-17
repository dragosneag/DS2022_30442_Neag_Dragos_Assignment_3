import React from 'react'

const DeviceRow = ({device, onClick}) => {
    return (
        <div className = "speciality" style={{color: "#38a280"}}>
            <br></br>
            <h2>
                <div>
                    <button type="submit" id="edit_device_button" onClick={(e) => onClick(e, device)}>
                        Edit device
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

export default DeviceRow