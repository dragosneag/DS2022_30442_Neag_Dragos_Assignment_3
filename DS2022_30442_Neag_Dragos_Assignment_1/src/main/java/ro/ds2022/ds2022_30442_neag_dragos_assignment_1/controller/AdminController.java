package ro.ds2022.ds2022_30442_neag_dragos_assignment_1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.DTO.AdminDTO;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.model.Admin;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.service.AdminService;

import java.util.Map;

@RestController
public class AdminController {

    @Autowired
    AdminService adminService;

    @PostMapping(value = "/addadmin")
    public Admin registerAdmin(@RequestBody Admin admin) {
        AdminDTO foundAdmin = adminService.findByUsername(admin.getUsername());
        if (foundAdmin != null) {
            return null;
        }
        String encryptedPass = BCrypt.hashpw(admin.getPassword(), BCrypt.gensalt());
        admin.setPassword(encryptedPass);
        return adminService.save(admin);
    }

    @GetMapping("/admins/login-admin")
    public AdminDTO loginAdmin(@RequestParam Map<String,String> requestParams) {
        String username = requestParams.get("username");
        String password = requestParams.get("password");
        AdminDTO matchingAdmin = adminService.findByUsername(username);
        if (matchingAdmin != null) {
            if (BCrypt.checkpw(password, matchingAdmin.getPassword())) {
                return matchingAdmin;
            }
        }
        return null;
    }
}
