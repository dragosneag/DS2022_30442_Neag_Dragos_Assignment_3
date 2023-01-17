package ro.ds2022.ds2022_30442_neag_dragos_assignment_1.rabbit_consumer;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.client.WebSocketClient;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;
import org.springframework.web.socket.sockjs.client.SockJsClient;
import org.springframework.web.socket.sockjs.client.Transport;
import org.springframework.web.socket.sockjs.client.WebSocketTransport;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.model.Client;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.model.ConsumptionDetails;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.model.Device;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.service.DeviceService;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Component
public class MessageListener {
    
    @Autowired
    DeviceService deviceService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @RabbitListener(queues = MQConfig.QUEUE)
    public void listener(CustomMessage message) {
        System.out.println(message);
        if (message.getClient_id() != null) {
            ConsumptionDetails consumptionDetails = new ConsumptionDetails();

            Instant instant = Instant.ofEpochSecond(message.getTimestamp());
            ZoneId zoneId = ZoneId.of("Europe/Bucharest");  // Set the desired time zone
            ZonedDateTime zonedDateTime = instant.atZone(zoneId);
            LocalDateTime localDateTime = zonedDateTime.toLocalDateTime();

            consumptionDetails.setTimestamp(localDateTime);
            consumptionDetails.setConsumption(message.getMeasurement());
            consumptionDetails.setClient_id(message.getClient_id());

            Device device = deviceService.findById(message.getDevice_id());

            System.out.println(consumptionDetails);
            System.out.println(device);

            checkMaxHourlyConsumption(device, consumptionDetails);

            System.out.println(deviceService.updateConsumptionDetails(device.getName(), consumptionDetails));
        }
    }

    private void checkMaxHourlyConsumption(Device device, ConsumptionDetails newDetail) {
        List<ConsumptionDetails> consumptionDetailsList = device.getConsumptionDetails();
        Double totalHourlyConsumption = 0.0;
        for (ConsumptionDetails consumptionDetails : consumptionDetailsList) {
            totalHourlyConsumption += consumptionDetails.getConsumption();
        }
        totalHourlyConsumption += newDetail.getConsumption();
        if (totalHourlyConsumption > device.getMaxHourlyConsumption()) {
            messagingTemplate.convertAndSend("/topic/greetings", "{\"overflow\": 1, \"device\": \"" + device.getName() + "\" , \"maxConsumption\": " + device.getMaxHourlyConsumption() + "}");
        } else {
            messagingTemplate.convertAndSend("/topic/greetings", "{\"overflow\": 0 }");
        }
    }
}
