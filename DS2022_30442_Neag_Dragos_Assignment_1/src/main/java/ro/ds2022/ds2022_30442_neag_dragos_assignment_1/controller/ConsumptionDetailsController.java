package ro.ds2022.ds2022_30442_neag_dragos_assignment_1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.DTO.ConsumptionDetailsDTO;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.DTO.DeviceDTO;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.model.ConsumptionDetails;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.model.Device;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.service.ConsumptionDetailsService;

import java.util.List;

@RestController
public class ConsumptionDetailsController {

    @Autowired
    ConsumptionDetailsService consumptionDetailsService;

    @PostMapping(value = "/adddetail")
    public ConsumptionDetails newConsumptionDetail(@RequestBody ConsumptionDetails consumptionDetails) {
        return consumptionDetailsService.save(consumptionDetails);
    }

    @GetMapping("/details")
    public List<ConsumptionDetailsDTO> allDetails() {
        return consumptionDetailsService.findAll();
    }
}
