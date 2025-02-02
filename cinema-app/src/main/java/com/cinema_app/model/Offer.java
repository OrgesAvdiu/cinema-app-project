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
    public String Title;
    public String Description;
    public Double Discount;
    public LocalDateTime StartDate;
    public LocalDateTime EndDate;
}