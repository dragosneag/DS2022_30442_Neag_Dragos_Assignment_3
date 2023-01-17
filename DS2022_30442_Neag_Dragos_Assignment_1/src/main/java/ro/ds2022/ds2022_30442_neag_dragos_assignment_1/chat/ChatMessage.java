package ro.ds2022.ds2022_30442_neag_dragos_assignment_1.chat;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ChatMessage {

    private String senderName;
    private String receiverName;
    private String message;
    private String date;
    private Status status;
}
