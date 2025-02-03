package com.cinema_app.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cinema_app.model.Category;
import com.cinema_app.service.CategoryService;

@RestController
@RequestMapping("/categories")
public class CategoryController  extends BasicControllerOperations<CategoryService,Category>{
       public CategoryController(CategoryService service) {
      super(service);
   }
}
