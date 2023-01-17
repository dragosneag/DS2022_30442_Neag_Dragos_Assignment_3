package ro.ds2022.ds2022_30442_neag_dragos_assignment_1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.model.User;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User save(User user) {
        return userRepository.save(user);
    }

    public List<User> findAll() {
        List<User> users = new ArrayList<>();
        Iterable<User> all = userRepository.findAll();
        all.forEach(users::add);
        return users;
    }
}
