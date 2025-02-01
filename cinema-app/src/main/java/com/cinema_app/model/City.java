package com.cinema_app.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity

public class City extends BaseEntity {
     public String name;

    @ManyToOne
    @JoinColumn(name = "offer_id", nullable = false, foreignKey = @ForeignKey(name = "fk_city_offer", foreignKeyDefinition = "FOREIGN KEY (offer_id) REFERENCES Offer(id) ON DELETE RESTRICT"))
    @JsonIgnoreProperties("city")
    private Offer offer;
}
