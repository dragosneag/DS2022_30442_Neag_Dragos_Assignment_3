package ro.ds2022.ds2022_30442_neag_dragos_assignment_1.repository;

import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.model.Client;

public interface ClientRepository extends AbstractRepository<Client>{

    Client findClientByUsername(String username);
    Client findClientById(Integer id);
}
