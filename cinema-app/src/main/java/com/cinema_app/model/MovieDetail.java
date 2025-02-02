package com.cinema_app.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class MovieDetail extends BaseEntity{
    

    @Transient
    private int numberOfTickets;

    @Transient
    private double totalPrice;

    @NotEmpty
    private String paymentMethod;
}
