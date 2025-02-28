package com.cinema_app.model;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Movie extends BaseEntity{
    public String title;
    public String description;
    public int duration;
    public LocalDateTime releaseDate;
    public double rating;
    public String language;
    public String imageUrl;
    public BigDecimal price;

     @ManyToMany
    @JoinTable(name = "movie_category",
               joinColumns = @JoinColumn(name = "movie_id"),
               inverseJoinColumns = @JoinColumn(name = "category_id"),
               foreignKey = @ForeignKey(name = "fk_movie_category_offer", 
               foreignKeyDefinition = "FOREIGN KEY (movie_id) REFERENCES Movie(id) ON DELETE RESTRICT"),
               inverseForeignKey = @ForeignKey(name = "fk_movie_category_category", 
               foreignKeyDefinition = "FOREIGN KEY (category_id) REFERENCES Category(id) ON DELETE RESTRICT"))
    private List<Category> category;
}
