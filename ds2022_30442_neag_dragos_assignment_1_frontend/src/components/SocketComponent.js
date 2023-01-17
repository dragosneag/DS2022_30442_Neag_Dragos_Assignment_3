import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs';

const SocketComponent = () => {

  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {

    var socket = new SockJS('http://localhost:8080/energy-platform/websocket');

    const stompClient = Stomp.over(socket);
    console.log("this is stomp" + stompClient)

    stompClient.connect({}, function(frame) {
      stompClient.subscribe('/topic/greetings', function(message) {
        console.log(message.body);
        var check = JSON.parse(message.body);
        if (check.overflow === 1) {
          alert("The device: " + check.device + " has exceeded its maximum allowed limit of consumption of : " + check.maxConsumption + "!");
        }
      });
    });

    setWs(socket);
  }, []);

  return (
    <div>
    </div>
  );
};

export default SocketComponent;
