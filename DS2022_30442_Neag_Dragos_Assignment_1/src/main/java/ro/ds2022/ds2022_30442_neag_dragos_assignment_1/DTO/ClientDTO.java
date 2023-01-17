package ro.ds2022.ds2022_30442_neag_dragos_assignment_1.DTO;

import java.util.List;

public class ClientDTO {

    private String id;
    private String name;
    private String username;
    private String password;
    private String role;
    private List<DeviceDTO> devices;

    public ClientDTO() {
    }

    public ClientDTO(String id, String name, String username, String password, String role, List<DeviceDTO> devices) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.password = password;
        this.role = role;
        this.devices = devices;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public List<DeviceDTO> getDevices() {
        return devices;
    }

    public void setDevices(List<DeviceDTO> devices) {
        this.devices = devices;
    }
}
