package ro.ds2022.ds2022_30442_neag_dragos_assignment_1.service;

import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.DTO.AdminDTO;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.DTO.ClientDTO;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.DTO.ConsumptionDetailsDTO;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.DTO.DeviceDTO;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.model.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class Mappers {

    public Admin adminFromDTO(AdminDTO adminDTO) {
        Admin admin = new Admin();

        admin.setName(adminDTO.getName());
        admin.setUsername(adminDTO.getUsername());
        admin.setPassword(adminDTO.getPassword());
        admin.setRole(Role.valueOf(adminDTO.getRole()));

        return admin;
    }

    public AdminDTO adminToDTO(Admin admin) {
        AdminDTO adminDTO = new AdminDTO();

        adminDTO.setName(admin.getName());
        adminDTO.setUsername(admin.getUsername());
        adminDTO.setPassword(admin.getPassword());
        adminDTO.setRole(String.valueOf(admin.getRole()));

        return adminDTO;
    }

    public Client clientFromDTO(ClientDTO clientDTO) {
        Client client = new Client();

        client.setName(clientDTO.getName());
        client.setUsername(clientDTO.getUsername());
        client.setPassword(clientDTO.getPassword());
        client.setRole(Role.valueOf(clientDTO.getRole()));

        List<Device> devices = new ArrayList<>();
        if (clientDTO.getDevices() != null) {
            for (DeviceDTO device : clientDTO.getDevices()) {
                devices.add(deviceFromDTO(device));
            }
        }
        client.setDevices(devices);

        return client;
    }

    public ClientDTO clientToDTO(Client client) {
        ClientDTO clientDTO = new ClientDTO();

        clientDTO.setId(String.valueOf(client.getId()));
        clientDTO.setName(client.getName());
        clientDTO.setUsername(client.getUsername());
        clientDTO.setPassword(client.getPassword());
        clientDTO.setRole(String.valueOf(client.getRole()));

        List<DeviceDTO> deviceDTOS = new ArrayList<>();
        if (client.getDevices() != null) {
            for (Device device : client.getDevices()) {
                deviceDTOS.add(deviceToDTO(device));
            }
        }
        clientDTO.setDevices(deviceDTOS);

        return clientDTO;
    }

    public ConsumptionDetails consumptionDetailsFromDTO(ConsumptionDetailsDTO consumptionDetailsDTO) {
        ConsumptionDetails consumptionDetails = new ConsumptionDetails();

        consumptionDetails.setTimestamp(LocalDateTime.parse(consumptionDetailsDTO.getTimestamp()));
        consumptionDetails.setConsumption(Double.valueOf(consumptionDetailsDTO.getConsumption()));

        return consumptionDetails;
    }

    public ConsumptionDetailsDTO consumptionDetailsToDTO(ConsumptionDetails consumptionDetails) {
        ConsumptionDetailsDTO consumptionDetailsDTO = new ConsumptionDetailsDTO();

        consumptionDetailsDTO.setTimestamp(String.valueOf(consumptionDetails.getTimestamp()));
        consumptionDetailsDTO.setConsumption(String.valueOf(consumptionDetails.getConsumption()));
        if (consumptionDetails.getDevice() != null) {
            consumptionDetailsDTO.setDevice(consumptionDetails.getDevice().getName());
        }

        return consumptionDetailsDTO;
    }

    public Device deviceFromDTO(DeviceDTO deviceDTO) {
        Device device = new Device();

        device.setId(Integer.valueOf(deviceDTO.getId()));
        device.setName(deviceDTO.getName());
        device.setDescription(deviceDTO.getDescription());
        device.setAddress(deviceDTO.getAddress());
        device.setMaxHourlyConsumption(Double.valueOf(deviceDTO.getMaxHourlyConsumption()));
        List<ConsumptionDetails> consumptionDetailsList = new ArrayList<>();
        if (deviceDTO.getConsumptionDetails() != null) {
            for (ConsumptionDetailsDTO consumptionDetail : deviceDTO.getConsumptionDetails()) {
                ConsumptionDetails consumptionDetailsToBeAdded = consumptionDetailsFromDTO(consumptionDetail);
                consumptionDetailsToBeAdded.setDevice(device);
                consumptionDetailsList.add(consumptionDetailsToBeAdded);
            }
        }
        device.setConsumptionDetails(consumptionDetailsList);
        return device;
    }

    public DeviceDTO deviceToDTO(Device device) {
        DeviceDTO deviceDTO = new DeviceDTO();

        deviceDTO.setId(String.valueOf(device.getId()));
        deviceDTO.setName(device.getName());
        deviceDTO.setDescription(device.getDescription());
        deviceDTO.setAddress(device.getAddress());
        deviceDTO.setMaxHourlyConsumption(String.valueOf(device.getMaxHourlyConsumption()));

        List<String> clientsList = new ArrayList<>();
        if (device.getClients() != null) {
            for (Client client : device.getClients()) {
                clientsList.add(client.getName());
            }
        }

        deviceDTO.setClients(clientsList);

        List<ConsumptionDetailsDTO> consumptionDetailsDTOS = new ArrayList<>();
        if (device.getConsumptionDetails() != null) {
            for (ConsumptionDetails consumptionDetail : device.getConsumptionDetails()) {
                consumptionDetailsDTOS.add(consumptionDetailsToDTO(consumptionDetail));
            }
        }

        deviceDTO.setConsumptionDetails(consumptionDetailsDTOS);

        return deviceDTO;
    }
}
