package ro.ds2022.ds2022_30442_neag_dragos_assignment_1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.DTO.ConsumptionDetailsDTO;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.DTO.DeviceDTO;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.model.ConsumptionDetails;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.model.Device;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.repository.ConsumptionDetailsRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ConsumptionDetailsService {

    @Autowired
    private ConsumptionDetailsRepository consumptionDetailsRepository;

    private Mappers mappers = new Mappers();;

    public void setConsumptionDetailsRepository(ConsumptionDetailsRepository consumptionDetailsRepository) {
        this.consumptionDetailsRepository = consumptionDetailsRepository;
    }

    public ConsumptionDetails save(ConsumptionDetails consumptionDetails) {
        ConsumptionDetails toBeSavedConsumptionDetails = consumptionDetails;
        toBeSavedConsumptionDetails.setTimestamp(LocalDateTime.now());
        return consumptionDetailsRepository.save(toBeSavedConsumptionDetails);
    }

    public List<ConsumptionDetailsDTO> findAll() {
        List<ConsumptionDetails> details = new ArrayList<>();
        List<ConsumptionDetailsDTO> detailsDTOList = new ArrayList<>();
        Iterable<ConsumptionDetails> all = consumptionDetailsRepository.findAll();
        all.forEach(details::add);
        for (ConsumptionDetails detail : details) {
            detailsDTOList.add(mappers.consumptionDetailsToDTO(detail));
        }
        return detailsDTOList;
    }
}
