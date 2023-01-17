package ro.ds2022.ds2022_30442_neag_dragos_assignment_1.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "client")
public class Client extends User{

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(name = "client_device",
            joinColumns = @JoinColumn(name = "client_id"),
            inverseJoinColumns = @JoinColumn(name = "device_id"))
    private List<Device> devices;

    public Client() {
    }

    public Client(List<Device> devices) {
        this.devices = devices;
    }

    public List<Device> getDevices() {
        return devices;
    }

    public void setDevices(List<Device> devices) {
        this.devices = devices;
    }

    @Override
    public String toString() {
        return "Client{" +
                "devices=" + devices +
                '}';
    }
}
