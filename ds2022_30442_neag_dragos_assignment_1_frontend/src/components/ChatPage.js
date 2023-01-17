import React, { useRef, useEffect, useState } from 'react'
import {Stomp} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"

var stompClient = null;

const ChatPage = () => {

    const myRef = useRef(null);
    const {state} = useLocation()
    const [privateChats, setPrivateChats] = useState(new Map());
    const [tab, setTab] = useState("");
    const [userData, setUserData] = useState({
        username: state.username,
        receivername: '',
        connected: false,
        message: ''
    });
    const [seenMessage, setSeenMessage] = useState(true);
    const [isTyping, setIsTyping] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        console.log(userData);
        if (userData.connected === false) {
            connect();
        }
        // const observer = new IntersectionObserver((entries) => {
        //     console.log("Observ ceva");
        //     entries.forEach((entry) => {
        //         if (entry.isIntersecting) {
        //             console.log(entry);
        //             console.log("My component is visible!");
        //             setSeenMessage(true)
        //         }
        //     });
        // });
        // if (!seenMessage) {
        //     observer.observe(myRef.current);
        //     return () => observer.unobserve(myRef.current);
        // }
        // if (isHovering && !seenMessage) {
        //     console.log("My component is visible!");
        //     setSeenMessage(true)
        // }
    }, [myRef, userData]);

    const connect =()=>{
        let Sock = new SockJS('http://localhost:8080/energy-platform/websocket');
        stompClient = Stomp.over(Sock);
        stompClient.connect({}, onConnected, onError);
    }

    const onConnected = () => {
        console.log("M-am conectat totusi");
        setUserData({...userData,"connected": true});
        if (state.username !== "admin1") {
            privateChats.set("admin1",[]);
            setPrivateChats(new Map(privateChats));
        }
        //stompClient.subscribe('/chatroom/public', onMessageReceived);
        try {
            stompClient.subscribe('/user/'+ userData.username +'/private', onPrivateMessage);
        } catch {
            console.log("WebSocket connection not yet established");
        }
        
        //userJoin();
    }

    const userJoin=()=>{
        var chatMessage = {
            senderName: userData.username,
            status:"JOIN"
        };
        console.log("M-am conectat totusi 2");
        stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    }

    const onMessageReceived = (payload)=>{
        var payloadData = JSON.parse(payload.body);
        switch(payloadData.status){
            case "JOIN":
                if(!privateChats.get(payloadData.senderName) && payloadData.senderName !== state.username){
                    if (state.username === "admin1") {
                        privateChats.set(payloadData.senderName,[]);
                        setPrivateChats(new Map(privateChats));
                    }
                }
                break;
        }
    }

    const onPrivateMessage = (payload)=>{
        console.log(payload);
        setIsTyping(false)
        var payloadData = JSON.parse(payload.body);
        if(privateChats.get(payloadData.senderName)){
            var chatSize = privateChats.get(payloadData.senderName).length;
            if(chatSize > 0) {
                if (privateChats.get(payloadData.senderName).at(chatSize - 1).message === "is typing...") {
                    privateChats.get(payloadData.senderName).pop();
                }
            }
            privateChats.get(payloadData.senderName).push(payloadData);
            setPrivateChats(new Map(privateChats));
        } else {
            let list =[];
            list.push(payloadData);
            privateChats.set(payloadData.senderName,list);
            setPrivateChats(new Map(privateChats));
        }
        if (payloadData.message !== "is typing..." && payloadData.message !== "seen your message") {
            setSeenMessage(false);
        }
        console.log(privateChats)
    }

    const onError = (err) => {
        console.log("WebSocket connection not yet established");
    }

    const handleMessage =(event)=>{
        const {value} = event.target;
        setUserData({...userData, "message": value});
        console.log(userData)
        if (stompClient && !isTyping) {
            var toSendMessage = "is typing...";
            var chatMessage = {
                senderName: userData.username,
                receiverName: tab,
                message: toSendMessage,
                status:"MESSAGE"
            };
            stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
            setUserData({...userData,"message": ""});
            setIsTyping(true)
        }
    }

    const sendPrivateValue=()=>{
        if (stompClient) {
            var chatMessage = {
                senderName: userData.username,
                receiverName: tab,
                message: userData.message,
                status:"MESSAGE"
            };
          
            if(userData.username !== tab){
                privateChats.get(tab).push(chatMessage);
                setPrivateChats(new Map(privateChats));
            }
            stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
            setUserData({...userData,"message": ""});
        }
    }

    function handleHover() {
        if (!seenMessage) {
            if (stompClient) {
                var toSendMessage = "seen your message";
                var chatMessage = {
                    senderName: userData.username,
                    receiverName: tab,
                    message: toSendMessage,
                    status:"MESSAGE"
                };
                stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
                setUserData({...userData,"message": ""});
            }
            setSeenMessage(true);
        }
    }

    return (
        <div className="container-2">
            <div className="chat-container">
                <div className="contact-list">
                    <ul>
                        {[...privateChats.keys()].map((name,index)=>(
                            <li onClick={()=>{setTab(name)}} className={`contact ${tab===name && "active"}`} key={index}>{name}</li>
                        ))}
                    </ul>
                </div>
                {tab!=="" && <div className="chat-content"  ref={myRef}>
                    <ul className="chat-messages" onMouseEnter={() => {setIsHovering(true); handleHover();}} onMouseLeave={() => setIsHovering(false)}>
                        {[...privateChats.get(tab)].map((chat,index)=>(
                            <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                                {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                                <div className="message-data">{chat.message}</div>
                                {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                            </li>
                        ))}
                    </ul>
    
                    <div className="send-message">
                        <input type="text" className="input-message" placeholder="Type message..." value={userData.message} onChange={handleMessage} /> 
                        <button type="submit" className="btn" onClick={sendPrivateValue}> Send </button>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default ChatPage