package com.cinema_app.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Customer extends UserAccount {

    @Column(nullable = false, columnDefinition = "INT DEFAULT 0")
    private Integer totalBonusPoints = 0;

    

    @Transient
    private String type = "Customer";
}