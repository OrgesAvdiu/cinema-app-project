package com.cinema_app.model;


import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Room extends BaseEntity{
    public int roomNumber;
    public int capacity;
    public String features;
}
