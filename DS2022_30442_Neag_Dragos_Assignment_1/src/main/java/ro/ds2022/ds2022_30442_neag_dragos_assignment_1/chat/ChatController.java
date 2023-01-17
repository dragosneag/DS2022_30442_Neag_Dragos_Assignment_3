package ro.ds2022.ds2022_30442_neag_dragos_assignment_1.chat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/message")
    @SendTo("/chatroom/public")
    public ChatMessage receiveMessage(@Payload ChatMessage message){
        return message;
    }

    @MessageMapping("/private-message")
    private ChatMessage receivePrivateMessage(@Payload ChatMessage message) {

        simpMessagingTemplate.convertAndSendToUser(message.getReceiverName(), "/private", message); // /user/Dragos/private
        return message;
    }
}
