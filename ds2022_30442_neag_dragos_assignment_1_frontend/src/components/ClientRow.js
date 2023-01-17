import React from 'react'

const ClientRow = ({client, onClick}) => {
    return (
        <div className = "speciality" style={{color: "#38a280"}}>
            <br></br>
            <h3>
                Name:
                <a>{client.name}</a>
                Username:
                <a>{client.username}</a>
                <button className = "btn" type="submit" id='btn-add-cart' onClick={(e) => onClick(e, client)}>
                    Edit client
                </button>
            </h3>
        </div>
    )
}

export default ClientRow