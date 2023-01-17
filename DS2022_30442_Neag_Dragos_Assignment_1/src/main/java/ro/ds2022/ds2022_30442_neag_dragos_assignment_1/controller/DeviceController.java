package ro.ds2022.ds2022_30442_neag_dragos_assignment_1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.DTO.ConsumptionDetailsDTO;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.DTO.DeviceDTO;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.model.Client;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.model.ConsumptionDetails;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.model.Device;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.service.DeviceService;

import java.util.List;

@RestController
public class DeviceController {

    @Autowired
    DeviceService deviceService;

    @PostMapping(value = "/adddevice")
    public Device newDevice(@RequestBody Device device) {
        return deviceService.save(device);
    }

    @GetMapping("/devices")
    public List<DeviceDTO> allDevices() {
        return deviceService.findAll();
    }

    @GetMapping("/devices/{name}/{client_id}/details")
    public List<ConsumptionDetailsDTO> getDetails(@PathVariable String name, @PathVariable Integer client_id) {
        return deviceService.findDetails(name, client_id);
    }

    @PutMapping("/devices/adddetails/{name}")
    public String addDetail(@PathVariable String name, @RequestBody ConsumptionDetails details) {
        if (deviceService.updateConsumptionDetails(name, details) != null) {
            return "Success";
        } else {
            return "Fail";
        }
    }

    @PutMapping("/updatedevice")
    public String editDevice(@RequestBody Device device) {
        Device updatedDevice = deviceService.update(device);
        if (updatedDevice != null) {
            return "Update successfull!";
        } else {
            return "Failed update";
        }
    }

    @DeleteMapping(value = "/deletedevice")
    public void delete(@RequestBody Device device) {
        deviceService.delete(device);
    }
}
