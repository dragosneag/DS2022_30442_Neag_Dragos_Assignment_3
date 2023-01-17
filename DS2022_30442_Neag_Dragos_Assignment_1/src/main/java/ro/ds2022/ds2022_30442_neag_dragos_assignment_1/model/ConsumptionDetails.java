package ro.ds2022.ds2022_30442_neag_dragos_assignment_1.model;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "consumption_details")
public class ConsumptionDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "timestamp", nullable = false)
    private LocalDateTime timestamp;

    @Column(name = "consumption", nullable = false)
    private Double consumption;

    @Column(name = "client_id", nullable = false)
    private Integer client_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "device_id")
    private Device device;

    public ConsumptionDetails() {
    }

    public ConsumptionDetails(LocalDateTime timestamp, Double consumption, Integer client_id, Device device) {
        this.timestamp = timestamp;
        this.consumption = consumption;
        this.client_id = client_id;
        this.device = device;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public Double getConsumption() {
        return consumption;
    }

    public void setConsumption(Double consumption) {
        this.consumption = consumption;
    }

    public Integer getClient_id() {
        return client_id;
    }

    public void setClient_id(Integer client_id) {
        this.client_id = client_id;
    }

    public Device getDevice() {
        return device;
    }

    public void setDevice(Device device) {
        this.device = device;
    }

    @Override
    public String toString() {
        return "ConsumptionDetails{" +
                "id=" + id +
                ", timestamp=" + timestamp +
                ", consumption=" + consumption +
                ", client_id=" + client_id +
                ", device=" + device +
                '}';
    }
}
