package com.cinema_app.model;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Cinema extends BaseEntity{
    public String name;
    public String location;
    public String contanctInfo;

      @ManyToOne
    @JoinColumn(name = "room_id", nullable = true, foreignKey = @ForeignKey(name = "fk_cinema_room",
     foreignKeyDefinition = "FOREIGN KEY (room_id) REFERENCES Room(id) ON DELETE RESTRICT"))
    private Room room;
}
