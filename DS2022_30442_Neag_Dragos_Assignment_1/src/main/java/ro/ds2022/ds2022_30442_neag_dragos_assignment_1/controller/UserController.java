package ro.ds2022.ds2022_30442_neag_dragos_assignment_1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.model.User;
import ro.ds2022.ds2022_30442_neag_dragos_assignment_1.service.UserService;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping(value = "/adduser")
    public User newUser(@RequestBody User user) {
        return userService.save(user);
    }

    @GetMapping("/users")
    public List<User> allUsers() {
        return userService.findAll();
    }
}