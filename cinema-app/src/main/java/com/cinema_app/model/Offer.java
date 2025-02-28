package com.cinema_app.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Offer extends BaseEntity{
    public String title;
    public String description;
    public Double discount;
    public LocalDateTime startDate;
    public LocalDateTime endDate;
}