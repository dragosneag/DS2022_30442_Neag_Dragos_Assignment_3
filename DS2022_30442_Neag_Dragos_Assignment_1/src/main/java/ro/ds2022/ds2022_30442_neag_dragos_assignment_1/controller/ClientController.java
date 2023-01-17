package ro.ds2022.ds2022_30442_neag_dragos_assignment_1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.DTO.ClientDTO;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.DTO.ConsumptionDetailsDTO;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.DTO.DeviceDTO;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.model.Client;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.model.ConsumptionDetails;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.model.Device;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.service.ClientService;

import java.util.List;
import java.util.Map;

@RestController
public class ClientController {

    @Autowired
    ClientService clientService;

    @PostMapping(value = "/addclient")
    public String registerClient(@RequestBody Client client) {
        try {
            clientService.save(client);
        } catch (Exception e) {
            String errorMessage = "{\"error\":\"" + e.getMessage() + "\"}";
            return errorMessage;
        }
        return "{\"success\":\"Successful save!\"}";
    }

    @GetMapping("/clients/login-client")
    public ClientDTO loginClient(@RequestParam Map<String,String> requestParams) {
        String username = requestParams.get("username");
        String password = requestParams.get("password");
        try {
            return clientService.findClient(username, password);
        } catch (Exception e) {
            String errorMessage = "{\"error\":\"" + e.getMessage() + "\"}";
        }
        return null;
    }

    @PutMapping("/updateclient")
    public String editClient(@RequestBody Client client) {
        Client updatedClient = clientService.update(client);
        if (updatedClient != null) {
            return "Update successfull!";
        } else {
            return "Failed update";
        }
    }

    @GetMapping("/clients")
    public List<ClientDTO> allClients() {
        return clientService.findAll();
    }

    @PutMapping("/clients/adddevice/{clientUsername}/{deviceName}")
    public ClientDTO addDevice(@PathVariable String clientUsername, @PathVariable String deviceName) {
        return clientService.addDevice(clientUsername, deviceName);
    }

    @GetMapping("/clients/{username}/devices")
    public List<DeviceDTO> getDevices(@PathVariable String username) {
        return clientService.findDevices(username);
    }

    @DeleteMapping(value = "/deleteclient")
    public void delete(@RequestBody Client client) {
        clientService.delete(client);
    }
}
