package com.cinema_app.model;

import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Category extends BaseEntity{
    @NotBlank
    public String name;
    public String Description;
    
    
}
