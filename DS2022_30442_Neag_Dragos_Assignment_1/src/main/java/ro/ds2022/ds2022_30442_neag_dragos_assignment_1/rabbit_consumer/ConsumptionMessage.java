package ro.ds2022.ds2022_30442_neag_dragos_assignment_1.rabbit_consumer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ConsumptionMessage {
    private String content;
}
