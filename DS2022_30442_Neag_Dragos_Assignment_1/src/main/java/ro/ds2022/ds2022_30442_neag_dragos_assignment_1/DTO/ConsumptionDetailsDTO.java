package ro.ds2022.ds2022_30442_neag_dragos_assignment_1.DTO;

public class ConsumptionDetailsDTO {

    private String timestamp;
    private String consumption;
    private String client_id;
    private String device;

    public ConsumptionDetailsDTO() {
    }

    public ConsumptionDetailsDTO(String timestamp, String consumption, String client_id, String device) {
        this.timestamp = timestamp;
        this.consumption = consumption;
        this.client_id = client_id;
        this.device = device;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public String getConsumption() {
        return consumption;
    }

    public void setConsumption(String consumption) {
        this.consumption = consumption;
    }

    public String getClient_id() {
        return client_id;
    }

    public void setClient_id(String client_id) {
        this.client_id = client_id;
    }

    public String getDevice() {
        return device;
    }

    public void setDevice(String device) {
        this.device = device;
    }
}
