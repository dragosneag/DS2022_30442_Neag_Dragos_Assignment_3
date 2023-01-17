package ro.ds2022.ds2022_30442_neag_dragos_assignment_1.repository;

import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.model.Admin;

public interface AdminRepository extends AbstractRepository<Admin> {

    Admin findAdminByUsername(String username);
}
