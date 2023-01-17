package ro.ds2022.ds2022_30442_neag_dragos_assignment_1.rabbit_consumer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CustomMessage {

    private Long timestamp;
    private Integer device_id;
    private Double measurement;
    private Integer client_id;
}
