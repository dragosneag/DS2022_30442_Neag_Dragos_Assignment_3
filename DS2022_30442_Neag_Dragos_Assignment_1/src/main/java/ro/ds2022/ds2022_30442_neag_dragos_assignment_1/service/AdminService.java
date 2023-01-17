package ro.ds2022.ds2022_30442_neag_dragos_assignment_1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.DTO.AdminDTO;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.model.Admin;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.repository.AdminRepository;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    private Mappers mappers = new Mappers();

    public void setAdminRepository(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public Admin save(Admin admin) {
        return adminRepository.save(admin);
    }

    public AdminDTO findByUsername(String username) {
        Admin admin = adminRepository.findAdminByUsername(username);
        if (admin != null) {
            return mappers.adminToDTO(admin);
        } else {
            return null;
        }
    }

    public Admin findAdminByUsername(String username) {
        return adminRepository.findAdminByUsername(username);
    }
}
