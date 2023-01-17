package ro.ds2022.ds2022_30442_neag_dragos_assignment_1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.DTO.ClientDTO;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.DTO.ConsumptionDetailsDTO;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.DTO.DeviceDTO;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.model.Client;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.model.ConsumptionDetails;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.model.Device;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.repository.ClientRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    private Mappers mappers = new Mappers();

    @Autowired
    private DeviceService deviceService;

    public void setClientRepository(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public void setDeviceService(DeviceService deviceService) {
        this.deviceService = deviceService;
    }

    public Client save(Client client) throws Exception{
        List<ClientDTO> clientDTOList = findAll();
        for (ClientDTO clientDTO : clientDTOList) {
            if (clientDTO.getUsername().equals(client.getUsername())) {
                throw new IllegalArgumentException("User already enrolled in application!");
            }
        }
        String encryptedPass = BCrypt.hashpw(client.getPassword(), BCrypt.gensalt());
        client.setPassword(encryptedPass);
        return clientRepository.save(client);
    }

    public Client findByUsername(String username) {
        return clientRepository.findClientByUsername(username);
    }

    public ClientDTO findClient(String username, String password) throws Exception{
        ClientDTO matchingClient = mappers.clientToDTO(clientRepository.findClientByUsername(username));
        if (matchingClient != null) {
            if (BCrypt.checkpw(password, matchingClient.getPassword())) {
                return matchingClient;
            } else {
                throw new IllegalArgumentException("Wrong password!");
            }
        } else {
            throw new IllegalArgumentException("The user does not exist!");
        }
    }

    public List<ClientDTO> findAll() {
        List<Client> clients = new ArrayList<>();
        List<ClientDTO> clientDTOList = new ArrayList<>();
        Iterable<Client> all = clientRepository.findAll();
        all.forEach(clients::add);
        for (Client client : clients) {
            clientDTOList.add(mappers.clientToDTO(client));
        }
        return clientDTOList;
    }

    public Client update(Client client) {
        Client toUpdateClient = clientRepository.findClientById(client.getId());
        toUpdateClient.setName(client.getName());
        toUpdateClient.setUsername(client.getUsername());
        return clientRepository.save(toUpdateClient);
    }

    public void delete(Client client) {
        Client toDeleteClient = clientRepository.findClientById(client.getId());
        clientRepository.delete(toDeleteClient);
    }

    public ClientDTO addDevice(String clientUsername, String deviceName) {
        Client initialClient = findByUsername(clientUsername);
        Device toAddDevice = deviceService.findByName(deviceName);
        List<Device> deviceList = initialClient.getDevices();
        deviceList.add(toAddDevice);
        initialClient.setDevices(deviceList);
        return mappers.clientToDTO(clientRepository.save(initialClient));
    }

    public List<DeviceDTO> findDevices(String username) {
        Client client = findByUsername(username);
        List<DeviceDTO> deviceDTOList = new ArrayList<>();
        for (Device device : client.getDevices()) {
            deviceDTOList.add(mappers.deviceToDTO(device));
        }
        return deviceDTOList;
    }
}
