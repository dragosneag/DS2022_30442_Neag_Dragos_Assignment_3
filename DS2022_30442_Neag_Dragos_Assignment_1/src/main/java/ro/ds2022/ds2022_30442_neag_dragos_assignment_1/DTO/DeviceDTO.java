package ro.ds2022.ds2022_30442_neag_dragos_assignment_1.DTO;

import java.util.List;

public class DeviceDTO {

    private String id;
    private String name;
    private String description;
    private String address;
    private String maxHourlyConsumption;
    private List<ConsumptionDetailsDTO> consumptionDetails;
    private List<String> clients;

    public DeviceDTO() {
    }

    public DeviceDTO(String id, String name, String description, String address, String maxHourlyConsumption, List<ConsumptionDetailsDTO> consumptionDetails, List<String> clients) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.address = address;
        this.maxHourlyConsumption = maxHourlyConsumption;
        this.consumptionDetails = consumptionDetails;
        this.clients = clients;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getMaxHourlyConsumption() {
        return maxHourlyConsumption;
    }

    public void setMaxHourlyConsumption(String maxHourlyConsumption) {
        this.maxHourlyConsumption = maxHourlyConsumption;
    }

    public List<ConsumptionDetailsDTO> getConsumptionDetails() {
        return consumptionDetails;
    }

    public void setConsumptionDetails(List<ConsumptionDetailsDTO> consumptionDetails) {
        this.consumptionDetails = consumptionDetails;
    }

    public List<String> getClients() {
        return clients;
    }

    public void setClients(List<String> clients) {
        this.clients = clients;
    }
}
