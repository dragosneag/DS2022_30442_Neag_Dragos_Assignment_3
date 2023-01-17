package ro.ds2022.ds2022_30442_neag_dragos_assignment_1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.DTO.ClientDTO;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.DTO.ConsumptionDetailsDTO;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.DTO.DeviceDTO;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.model.Client;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.model.ConsumptionDetails;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.model.Device;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.repository.DeviceRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class DeviceService {

    @Autowired
    private DeviceRepository deviceRepository;

    private Mappers mappers = new Mappers();

    @Autowired
    private ConsumptionDetailsService consumptionDetailsService;

    public void setDeviceRepository(DeviceRepository deviceRepository) {
        this.deviceRepository = deviceRepository;
    }

    public void setConsumptionDetailsService(ConsumptionDetailsService consumptionDetailsService) {
        this.consumptionDetailsService = consumptionDetailsService;
    }

    public Device save(Device device) {
        return deviceRepository.save(device);
    }

    public Device findByName(String name) {
        return deviceRepository.findDeviceByName(name);
    }

    public Device findById(Integer id) {
        return deviceRepository.findDeviceById(id);
    }

    public List<DeviceDTO> findAll() {
        List<Device> devices = new ArrayList<>();
        List<DeviceDTO> deviceDTOList = new ArrayList<>();
        Iterable<Device> all = deviceRepository.findAll();
        all.forEach(devices::add);
        for (Device device : devices) {
            deviceDTOList.add(mappers.deviceToDTO(device));
        }
        return deviceDTOList;
    }

    public List<ConsumptionDetailsDTO> findDetails(String name, Integer client_id) {
        Device device = findByName(name);
        List<ConsumptionDetailsDTO> consumptionDetailsDTOList = new ArrayList<>();
        for (ConsumptionDetails detail : device.getConsumptionDetails()) {
            if (Objects.equals(detail.getClient_id(), client_id)) {
                consumptionDetailsDTOList.add(mappers.consumptionDetailsToDTO(detail));
            }
        }
        return consumptionDetailsDTOList;
    }

    public ConsumptionDetailsDTO updateConsumptionDetails(String deviceName, ConsumptionDetails detail) {
        detail.setDevice(findByName(deviceName));
        return mappers.consumptionDetailsToDTO(consumptionDetailsService.save(detail));
    }

    public Device update(Device device) {
        Device toUpdateDevice = deviceRepository.findDeviceById(device.getId());
        toUpdateDevice.setName(device.getName());
        toUpdateDevice.setDescription(device.getDescription());
        toUpdateDevice.setAddress(device.getAddress());
        toUpdateDevice.setMaxHourlyConsumption(device.getMaxHourlyConsumption());
        return deviceRepository.save(toUpdateDevice);
    }

    public void delete(Device device) {
        Device toDeleteDevice = deviceRepository.findDeviceById(device.getId());
        deviceRepository.delete(toDeleteDevice);
    }
}
