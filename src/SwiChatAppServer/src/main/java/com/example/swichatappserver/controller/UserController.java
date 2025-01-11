package com.example.swichatappserver.controller;

import com.example.swichatappserver.model.dto.UserDto;
import com.example.swichatappserver.model.entity.User;
import com.example.swichatappserver.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public UserDto createUser(@RequestBody String username) {
        User user = userService.createUser(username);
        return new UserDto(user.getId(), user.getUsername());
    }

    @GetMapping
    public List<UserDto> getAllUsers() {
        return userService.getAllUsers().stream()
                .map(user -> new UserDto(user.getId(), user.getUsername()))
                .collect(Collectors.toList());
    }

    @PostMapping("/username-containing")
    public List<UserDto> getUserByUsernameContaining(@RequestBody String username) {
        List<User> users = userService.findUsersByUsernameContaining(username);
        return users.stream()
                .map(user -> new UserDto(user.getId(), user.getUsername()))
                .collect(Collectors.toList());
    }

    @PostMapping("/username")
    public UserDto getUserByUsername(@RequestBody String username) {
        User user = userService.getUserByUsername(username);
        return new UserDto(user.getId(), user.getUsername());
    }

    @GetMapping("/{userId}")
    public UserDto getUserById(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        return new UserDto(user.getId(), user.getUsername());
    }
}
