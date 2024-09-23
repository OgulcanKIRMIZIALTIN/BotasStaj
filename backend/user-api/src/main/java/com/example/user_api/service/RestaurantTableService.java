package com.example.user_api.service; // Adjust the package name according to your project structure

// Import necessary classes
import com.example.user_api.model.RestaurantTable;
import com.example.user_api.repository.RestaurantTableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

// Annotates the class as a Spring service, marking it as a service layer component
@Service
public class RestaurantTableService {

    // Injects the RestaurantTableRepository to interact with the RestaurantTable database table
    @Autowired
    private RestaurantTableRepository restaurantTableRepository;

    // Retrieves all restaurant tables from the repository
    public List<RestaurantTable> getAllTables() {
        return restaurantTableRepository.findAll();
    }

    // Retrieves a restaurant table by its ID (Long)
    public Optional<RestaurantTable> getTableByNumber(Long id) {
        return restaurantTableRepository.findById(id);
    }

    // Fetches a table by its table number (Integer)
    public Optional<RestaurantTable> getTableByNumber(Integer tableNumber) {
        return restaurantTableRepository.findByTableNumber(tableNumber);
    }

    // Saves a new or existing table to the repository
    public RestaurantTable saveTable(RestaurantTable table) {
        return restaurantTableRepository.save(table);
    }

    // Deletes a table by its ID from the repository
    public void deleteTable(Long id) {
        restaurantTableRepository.deleteById(id);
    }
}
