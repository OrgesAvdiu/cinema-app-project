package com.cinema_app.service;

import org.springframework.stereotype.Service;
import com.cinema_app.model.Category;
import com.cinema_app.repository.CategoryRepository;

@Service
public class CategoryService extends BasicServiceOperations<CategoryRepository, Category> {
    public CategoryService(CategoryRepository repository) {
        super(repository);
     }
  
     public Category save(Category entity) {
        if (entity.getId() == null) {
           super.save(entity);
        }
  
        validateEntity(entity);
        Category category = findById(entity.getId());
        category.setName(entity.getName());
  
        return repository.save(category);
     }

}