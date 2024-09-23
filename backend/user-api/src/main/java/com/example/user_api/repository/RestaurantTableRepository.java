package com.example.user_api.repository; // Adjust the package name according to your project structure

// Import necessary classes for JPA repository functionality
import com.example.user_api.model.RestaurantTable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// Defines a repository interface for the RestaurantTable entity
// Extends JpaRepository to provide CRUD operations and more for the RestaurantTable entity
public interface RestaurantTableRepository extends JpaRepository<RestaurantTable, Long> {

    // Custom query method to find a RestaurantTable by its table number
    // Returns an Optional containing the RestaurantTable if found, or empty if not
    Optional<RestaurantTable> findByTableNumber(Integer tableNumber);
}
