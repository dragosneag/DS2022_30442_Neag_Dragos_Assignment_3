package ro.ds2022.ds2022_30442_neag_dragos_assignment_1.repository;

import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.model.Device;

public interface DeviceRepository extends AbstractRepository<Device>{

    Device findDeviceByName(String name);

    Device findDeviceById(Integer id);
}
